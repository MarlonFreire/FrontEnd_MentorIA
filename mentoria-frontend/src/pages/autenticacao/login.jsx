import React, { useState } from 'react';
import './login.css';
import imagemLateral from '../../imagens/MentorIA.png';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [tipoUsuario, setTipoUsuario] = useState('estudante');
  const navigate = useNavigate(); 

  const lidarComLogin = (e) => {
    e.preventDefault(); 

    if (tipoUsuario === 'professor') {
      navigate('/dashboard-professor'); 
    } else {
      navigate('/dashboard-aluno');
    } // Fechei o else corretamente aqui
  }; // Fechei a função lidarComLogin aqui

  return (
    <div className="login-container">
      <div className="lado-esquerdo">
        <img src={imagemLateral} alt="Logo MentorIA" className="logo-png" />
        <h2>Aprimore sua escrita com IA</h2>
        <p>Participe do MentorIA para obter feedback inteligente sobre redações, colaboração perfeita com professores e um caminho comprovado para melhores notas.</p>
      </div>

      <div className="lado-direito">
        <h1>Bem-vindo de volta</h1>
        <p className="subtitulo">Por favor, insira seus dados para fazer login.</p>

        <div className="abas">
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

        <form className="formulario" onSubmit={lidarComLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder={tipoUsuario === 'estudante' ? 'student@example.com' : 'teacher@example.com'} 
          />

          <div className="label-senha">
            <label>Senha</label>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <input type="password" placeholder="********" />

          <button type="submit" className="botao-login">
            Login →
          </button>
        </form>

        <p className="cadastro">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
} // Esta chave fecha o componente Login

export default Login;