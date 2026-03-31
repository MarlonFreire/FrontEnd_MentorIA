import React from "react";
import { Link } from "react-router-dom";
import { 
  Upload, 
  Cpu, 
  Layout, 
  TrendingUp, 
  Zap, 
  Search, 
  Clock, 
  Users, 
  Target, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  FileText
} from "lucide-react";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">Mentor<span>IA</span></div>
        <nav className="menu">
          <a href="#como-funciona">Como funciona</a>
          <a href="#Diferenciais">Diferenciais</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>
        </nav>
        <Link to="/cadastro" className="btn-primary small">Começar agora</Link>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            <ShieldCheck size={14} /> 
            <span>Tecnologia em conformidade com a LGPD</span>
          </div>
          <h1>Evolua sua escrita com inteligência artificial e revisão humana</h1>
          <p>
            Uma plataforma analítica desenvolvida para elevar o padrão técnico de 
            redações através de processamento de linguagem natural e mentoria especializada.
          </p>
          <div className="hero-btns">
            <Link to="/cadastro" className="btn-primary">Criar conta gratuita</Link>
            <Link to="/login" className="btn-outline">Acessar plataforma</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop" 
              alt="Interface de Análise" 
            />
            {/* Elementos Flutuantes (Simulando a imagem exemplo) */}
            <div className="floating-ui f-1">
              <Cpu size={16} /> <span>Análise de Coerência: 98%</span>
            </div>
            <div className="floating-ui f-2">
              <FileText size={16} /> <span>Sugestão de Vocabulário</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID (Como Funciona) */}
      <section id="como-funciona" className="section-padding">
        <div className="section-intro">
          <h2>Como funciona o sistema</h2>
          <p>Processos de correção de redações automatizadas e correção humana integrados para máxima eficiência.</p>
        </div>

        <div className="bento-grid">
          <div className="grid-item item-main">
            <div className="icon-box"><Upload size={20} /></div>
            <h4>Envio das redações</h4>
            <p>Envio digital de textos com suporte a múltiplos formatos e editor integrado.</p>
          </div>

          <div className="grid-item item-small">
            <div className="icon-box"><Zap size={20} /></div>
            <h4>Correção Automática</h4>
            <p>Uma Ia corrigi inicialmete a redação</p>
          </div>

          <div className="grid-item item-small">
            <div className="icon-box"><Layout size={20} /></div>
            <h4>Revisão por professores</h4>
            <p>Após a correção da IA o professor revisa essa correção e passa o feedback</p>
          </div>

          <div className="grid-item item-wide">
            <div className="icon-box"><TrendingUp size={24} /></div>
            <div>
              <h4>Turmas individuais</h4>
              <p>Cada professor pode criar suas proprias turmas.</p>
            </div>
          </div>

          <div className="grid-item item-wide blue">
            <div className="icon-box white"><Cpu size={24} /></div>
            <div>
              <h4>Feedback em Tempo Real</h4>
              <p>Intervenções sugeridas instantaneamente por nossos algoritmos de IA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="split-section">
        <div className="split-img-container">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" 
            alt="Profissional revisando texto" 
          />
        </div>
        <div className="split-content">
          <h2>Beneficios</h2>
          <p>
            Nossa metodologia combina a precisão da IA com a expertise de professores 
            para reduzir o ciclo de feedback e acelerar sua curva de aprendizado.
          </p>
          <ul className="check-list">
            <li><CheckCircle2 size={18} /> Maior precisão nas correções</li>
            <li><CheckCircle2 size={18} /> Otimização de tempo</li>
            <li><CheckCircle2 size={18} /> Evita acumulo de redações</li>
          </ul>
        </div>
      </section>

      {/* RECURSOS (Cards) */}
      <section id="recursos" className="section-padding gray-bg">
        <div className="center-header">
          <span className="pre-title">Funcionalidades</span>
          <h2>Recursos para alta performance</h2>
        </div>
        <div className="cards-grid">
          <div className="feature-card">
            <Search size={32} className="card-icon" />
            <h3>correção por IA</h3>
            <p>Uma IA corrigi sua redação inicialmete indicando inicialmete os principais erros</p>
          </div>
          <div className="feature-card">
            <Clock size={32} className="card-icon" />
            <h3>Otimização de Tempo</h3>
            <p>Redução de até 70% no tempo de espera por revisões qualificadas.</p>
          </div>
          <div className="feature-card">
            <Users size={32} className="card-icon" />
            <h3>Revisão Humana</h3>
            <p>Interação com professores especialistas para refino argumentativo.</p>
          </div>
          <div className="feature-card">
            <Target size={32} className="card-icon" />
            <h3>Foco em Resultados</h3>
            <p>Dashboard focado no progresso constante das notas e competências.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="section-padding">
        <div className="center-header">
          <h2>Veja o que dizem</h2>
        </div>
        <div className="testimonials-row">
          <div className="t-card">
            <div className="user-profile">
              <div className="user-avatar">AD</div>
              <div>
                <strong>Ana Drummond</strong>
                <span>Estudante de Medicina</span>
              </div>
            </div>
            <p>"A precisão das correções automatizadas elevou meu nível de escrita técnica drasticamente."</p>
          </div>
          <div className="t-card">
            <div className="user-profile">
              <div className="user-avatar blue">CP</div>
              <div>
                <strong>Carlos Prado</strong>
                <span>Professor de Linguagens</span>
              </div>
            </div>
            <p>"Uma ferramenta indispensável para monitorar o progresso individual de cada aluno."</p>
          </div>
          <div className="t-card">
            <div className="user-profile">
              <div className="user-avatar">MG</div>
              <div>
                <strong>Mariana Guedes</strong>
                <span>Vestibulanda</span>
              </div>
            </div>
            <p>"O feedback em tempo real permite que eu aprenda com meus erros no momento da escrita."</p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-text">
            <h2>Pronto para transformar sua escrita?</h2>
            <p>Junte-se a milhares de usuários que já evoluíram com o MentorIA.</p>
            <Link to="/cadastro" className="btn-white">Cadastre-se já <ChevronRight size={18} /></Link>
          </div>
          <div className="cta-img">
            <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop" alt="Notebook" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-brand">
            <h3>Mentor<span>IA</span></h3>
            <p>Plataforma inteligente para o aprimoramento da comunicação escrita.</p>
          </div>
          <div className="footer-col">
            <h4>Produto</h4>
            <a href="#">Recursos</a>
            <a href="#">Metodologia</a>
            <a href="#">Preços</a>
          </div>
          <div className="footer-col">
            <h4>Suporte</h4>
            <a href="#">Documentação</a>
            <a href="#">Contato</a>
            <a href="#">Privacidade</a>
          </div>
          <div className="footer-col">
            <h4>Empresa</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Blog</a>
            <a href="#">Carreiras</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 MentorIA S.A. Tecnologia em Educação.</p>
        </div>
      </footer>
    </div>
  );
}