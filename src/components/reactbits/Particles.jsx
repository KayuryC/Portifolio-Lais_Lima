import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import "./Particles.css";

/**
 * React Bits — "Particles" (WebGL via ogl).
 * Campo de partículas douradas, esparso e lento — lido como "pontos de
 * dado" flutuando sobre a grade ledger do fundo. Mantido bem sutil para
 * não competir com o conteúdo nem pesar o carregamento.
 *
 * É montado apenas quando o movimento é permitido (ver os componentes de
 * seção) e carregado sob demanda (React.lazy), ficando fora do bundle inicial.
 */

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;

  void main() {
    vRandom = random;
    vec3 pos = position * uSpread;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.2831 * random.w) * mix(0.1, 1.2, random.x);
    mPos.y += sin(t * random.y + 6.2831 * random.x) * mix(0.1, 1.2, random.w);
    mPos.z += sin(t * random.w + 6.2831 * random.y) * mix(0.1, 1.2, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uAlpha;
  uniform vec3 uColor;
  varying vec4 vRandom;

  void main() {
    vec2 uv = gl_PointCoord.xy - 0.5;
    float d = length(uv);
    float circle = smoothstep(0.5, 0.35, d);
    if (circle < 0.02) discard;
    float a = circle * uAlpha * (0.45 + 0.55 * vRandom.x);
    gl_FragColor = vec4(uColor, a);
  }
`;

export default function Particles({
  count = 90,
  color = [0.851, 0.741, 0.549], // ~ var(--gold-300) #D9BD8C
  spread = 12,
  baseSize = 70,
  sizeRandomness = 1,
  alpha = 0.45,
  speed = 0.08,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    // Se o WebGL não estiver disponível, falha em silêncio: a página segue
    // perfeitamente sem o fundo (degradação graciosa, sem quebrar o React).
    let renderer;
    let gl;
    try {
      renderer = new Renderer({ depth: false, alpha: true });
      gl = renderer.gl;
    } catch {
      return undefined;
    }

    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, 20);

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize);
    resize();

    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    for (let i = 0; i < count; i += 1) {
      let x;
      let y;
      let z;
      let len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4
      );
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: spread },
        uBaseSize: { value: baseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlpha: { value: alpha },
        uColor: { value: color },
      },
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let running = true;

    const update = (t) => {
      if (!running) return;
      raf = requestAnimationFrame(update);
      const delta = t - last;
      last = t;
      elapsed += delta * speed;
      program.uniforms.uTime.value = elapsed * 0.001;
      particles.rotation.y = elapsed * 0.00006;
      renderer.render({ scene: particles, camera });
    };
    raf = requestAnimationFrame(update);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // color é estático em runtime; demais props primitivas controlam o efeito
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, spread, baseSize, sizeRandomness, alpha, speed]);

  return (
    <div
      ref={containerRef}
      className={`particles ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
