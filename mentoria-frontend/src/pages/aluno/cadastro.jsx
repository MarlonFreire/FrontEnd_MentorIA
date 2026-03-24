import React from 'react';
import './cadastro.css';
import { Link } from 'react-router-dom';

function Cadastro() {
  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>Seja Bem-Vindo</h1>
        <p>Por favor, insira seus dados para fazer seu cadastro.</p>

        <form className="formulario">
          <label>Nome</label>
          <input type="text" placeholder="Seu nome completo" />

          <label>Email</label>
          <input type="email" placeholder="student@example.com" />

          <label>Senha</label>
          <input type="password" placeholder="********" />
          
          <label>Confirme a senha</label>
          <input type="password" placeholder="********" />

          <button type="submit" className="botao-entrar">
            Entrar →
          </button>
        </form>

        <p className="voltar-login">
          Já possui uma conta? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;