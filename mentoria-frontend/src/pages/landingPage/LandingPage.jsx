import "./landing.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">MentorIA</div>

        <nav className="menu">
          <a>Como funciona</a>
          <a>Estudantes</a>
          <a>Professores</a>
          <a>Preços</a>
        </nav>

        <div className="navButtons">
          <Link to="/login" className="outline">Entrar</Link>
          <Link to="/cadastro" className="primary">Começar</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Escreva melhor com ajuda de IA</h1>
          <p>
            Feedback inteligente, correção automática e evolução contínua
            na sua escrita.
          </p>

          <div className="heroBtns">
            <Link to="/cadastro" className="primary">Começar grátis</Link>
            <Link to="/login" className="secondary">Já tenho conta</Link>
          </div>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          className="heroImg"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Recursos poderosos</h2>

        <div className="cards">

          {[
            { icon: "📄", title: "Análise automática", text: "Correção inteligente da estrutura do texto." },
            { icon: "✏️", title: "Revisão humana", text: "Professores melhoram sua redação." },
            { icon: "⚡", title: "Tempo real", text: "Feedback instantâneo enquanto escreve." }
          ].map((item, i) => (
            <motion.div 
              className="card"
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        {["10k+", "50k+", "1k+"].map((num, i) => (
          <motion.div 
            className="stat"
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <span>{num}</span>
            <p>RESULTADOS</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="cta">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h2>Pronto para evoluir?</h2>
          <p>Comece agora gratuitamente.</p>
          <Link to="/cadastro" className="primary big">
            Criar conta
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="logo">MentorIA</div>
        <p>© 2026</p>
      </footer>

    </div>
  );
}