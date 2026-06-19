# Laís Lima — Portfólio (React + Vite)

Site institucional de **Laís Lima — Economista**, migrado de HTML/CSS/JS puro
para **React + Vite**, preservando 100% do conteúdo, textos, links, paleta
(azul-marinho + dourado + creme) e tipografia (Fraunces + Inter).

## Como rodar localmente

```bash
npm install
npm run dev
```

O Vite sobe em `http://localhost:5173`.

Outros comandos:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a build de produção localmente
```

### ⚠️ Imagens

As duas fotos não vieram no repositório. Coloque-as em `public/images/`
com exatamente estes nomes (os caminhos do site já apontam para elas):

- `public/images/lais-profile.jpg` — foto do Hero (retrato vertical, ~420×560)
- `public/images/lais-sofa.jpg` — foto da seção "Sobre" (~540×560)

Enquanto não existirem, o layout continua funcionando (os quadros aparecem
como blocos sólidos no lugar das fotos).

## Estrutura

```
index.html                 # entry do Vite (preconnect + Google Fonts + #root)
public/images/             # fotos (lais-profile.jpg, lais-sofa.jpg)
src/
  main.jsx                 # bootstrap React + import dos estilos globais
  App.jsx                  # composição das seções
  constants.js             # links (WhatsApp/Instagram/e-mail) — fonte única
  styles/
    tokens.css             # variáveis de cor e fonte (design tokens)
    base.css               # reset, utilitários, foco visível, reduced-motion
  components/
    Header.jsx  Hero.jsx  About.jsx  Services.jsx
    Testimonials.jsx  Contact.jsx  Footer.jsx   (+ .css co-locado de cada um)
    reactbits/             # componentes da React Bits adaptados
      SplitText.jsx  SpotlightCard.jsx  Magnet.jsx
      Particles.jsx  Marquee.jsx  AnimatedSection.jsx
```

## Componentes da React Bits utilizados

| Onde | Componente (React Bits) | Por quê |
|------|--------------------------|---------|
| **Hero — headline** | **Split Text** | Revela o título palavra a palavra (fade + leve subida, com stagger), mantendo o timing suave do site original. Sóbrio, não chamativo. |
| **Hero + Contato — fundo** | **Particles** (WebGL/ogl) | Partículas douradas esparsas e lentas sobre a grade "ledger", lidas como "pontos de dado" flutuando — reforça a identidade financeira sem poluir. Carregado sob demanda (lazy) e fora do bundle inicial. |
| **Serviços — cards** | **Spotlight Card** | Brilho radial dourado discreto seguindo o cursor. Escolhi spotlight em vez de tilt 3D por ser mais elegante e sério para conteúdo financeiro (tilt costuma parecer "lúdico"). Sem dependências. |
| **CTAs do WhatsApp** | **Magnet** | Micro-interação: o botão é levemente "atraído" pelo cursor, somado ao lift de hover original. Desligado no toque e no reduced-motion. |
| **Depoimentos** | **Marquee / Infinite Moving Cards** | Substitui o grid estático por uma faixa em loop contínuo e lento, que pausa no hover/foco. No reduced-motion volta ao grid estático original. |
| **Revelação ao rolar** | **Animated / Fade Content** | Seções entram com fade + subida ao aparecer na viewport (substitui o IntersectionObserver do site original), respeitando reduced-motion. |

### Bibliotecas adicionadas (mínimas)

- **`motion`** (Framer Motion) — runtime de animação único para Split Text,
  revelações ao rolar e o efeito Magnet.
- **`ogl`** — WebGL leve usado **apenas** pelo fundo de partículas, carregado
  sob demanda (`React.lazy`) — fica em um chunk separado (~15 kB gzip) e nunca
  entra no carregamento inicial.

Spotlight Card e Marquee são implementados sem dependências (CSS + um listener).

## Acessibilidade e performance preservadas

- **`prefers-reduced-motion`**: respeitado globalmente; Split Text/Particles/
  Magnet/Marquee são desligados ou viram versão estática.
- **Foco visível** de teclado mantido (`:focus-visible` dourado); o menu mobile
  é acessível (`aria-expanded`/`aria-controls`, fecha no Esc).
- **Responsivo** nos mesmos breakpoints (980px e 600px).
- **Imagens** com `loading="lazy"` (exceto a do Hero, acima da dobra) e
  `decoding="async"`.
- Fundo WebGL **lazy** e desligado quando há WebGL indisponível (degrada sem
  quebrar).
