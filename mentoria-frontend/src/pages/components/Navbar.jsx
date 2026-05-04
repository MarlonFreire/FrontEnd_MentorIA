import React from 'react';
import './Navbar.css';
import logo from '../../imagens/MentorIA.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="MentorIA" />
        <span>MentorIA</span>
      </div>
      <div className="navbar-perfil">
        <div className="usuario-info">
          <span className="usuario-nome">maria freitas</span>
          <span className="usuario-cargo">Professor</span>
        </div>
        <button className="botao-sair">🚪</button>
      </div>
    </nav>
  );
}

export default Navbar;