import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        © {year} Laís Lima — Economista. Todos os direitos reservados.
      </div>
    </footer>
  );
}
