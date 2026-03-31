import "./landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">MentorIA</div>

        <nav className="menu">
          <a>Home</a>
          <a>Funcionalidades</a>
          <a>Sobre</a>
          <a>Contato</a>
        </nav>

        <Link className="primary small">Começar</Link>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="heroLeft">
          <h1>Plataforma inteligente para evolução na escrita</h1>
          <p>Feedback com IA + professores reais</p>

          <div className="heroBtns">
            <Link className="primary">Começar agora</Link>
            <Link className="outline">Ver mais</Link>
          </div>
        </div>

        <div className="heroRight">
          <div className="mockCard big"></div>
          <div className="mockCard small"></div>
        </div>
      </section>

      {/* GRID FEATURES */}
      <section className="gridSection">
        <div className="grid">

          <div className="gridBig"></div>

          <div className="gridSmall"></div>
          <div className="gridSmall"></div>

          <div className="gridWide"></div>
          <div className="gridWide blue"></div>

        </div>
      </section>

      {/* CONTENT SPLIT */}
      <section className="split">
        <div className="splitImg"></div>

        <div className="splitText">
          <h2>Aprenda mais rápido</h2>
          <p>
            Corrija suas redações com inteligência artificial e evolua constantemente.
          </p>

          <div className="tags">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="cardsSection">
        <h2>Recursos</h2>

        <div className="cards">
          {[1,2,3,4].map(i => (
            <div key={i} className="card"></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="ctaLeft">
          <h2>Comece agora</h2>
          <p>Melhore sua escrita hoje</p>
          <Link className="whiteBtn">Começar</Link>
        </div>

        <div className="ctaRight"></div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerCols">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </footer>

    </div>
  );
}