import React, { useState } from 'react';
import './cadastro.css';
import { Link, useNavigate } from 'react-router-dom'; 

function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState('estudante');
  const navigate = useNavigate(); 

  const lidarComCadastro = (e) => {
    e.preventDefault();

   
    console.log("Cadastrando como:", tipoUsuario);

    if (tipoUsuario === 'professor') {
      navigate('/dashboard-professor');
    } else {
      navigate('/dashboard-aluno'); 
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>Seja Bem-Vindo</h1>
        <p>Por favor, insira seus dados para fazer seu cadastro.</p>

        <div className="abas-cadastro">
          <button 
            className={tipoUsuario === 'estudante' ? 'aba-ativa' : ''} 
            onClick={() => setTipoUsuario('estudante')}
          >
            🎓 Estudante
          </button>
          <button 
            className={tipoUsuario === 'professor' ? 'aba-ativa' : ''} 
            onClick={() => setTipoUsuario('professor')}
          >
            🧑‍🏫 Professor
          </button>
        </div>

        {/* 4. Adicionar o onSubmit no formulário */}
        <form className="formulario" onSubmit={lidarComCadastro}>
          <label>Nome</label>
          <input type="text" placeholder="Seu nome completo" required />

          <label>Email</label>
          <input 
            type="email" 
            placeholder={tipoUsuario === 'estudante' ? 'student@example.com' : 'teacher@example.com'} 
            required
          />

          <label>Senha</label>
          <input type="password" placeholder="********" required />
          
          <label>Confirme a senha</label>
          <input type="password" placeholder="********" required />

          <button type="submit" className="botao-entrar">
            Cadastrar como {tipoUsuario === 'estudante' ? 'Estudante' : 'Professor'} →
          </button>
        </form>

        <p className="voltar-login">
          Já possui uma conta? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;