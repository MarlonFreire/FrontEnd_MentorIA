import React, { useState } from 'react';
import './login.css';
import imagemLateral from '../../imagens/MentorIA.png';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [tipoUsuario, setTipoUsuario] = useState('estudante');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const lidarComLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:5000/usuarios?email=${email}`);
      const usuarios = await resposta.json();

      if (usuarios.length > 0 && usuarios[0].senha === senha) {
        const user = usuarios[0];

        localStorage.setItem('usuarioLogado', JSON.stringify(user));

        const tipo = user.tipo_usuário || user.tipo_usuario;

        if (tipo.toLowerCase() === 'professor') {
          navigate('/dashboard-professor');
        } else {
          navigate('/dashboard-aluno');
        }
      } else {
        alert("Email ou senha incorretos!");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor!");
    }
  };

  return (
    <div className="login-container">

      {/* LADO ESQUERDO */}
      <div className="lado-esquerdo">
        <div className="logo-wrapper">
          <img src={imagemLateral} alt="Logo MentorIA" className="logo-png" />
          <p className="logo-subtitulo">Plataforma de redações</p>
        </div>
        <h2>Aprimore sua escrita com inteligência artificial</h2>
        <p>Feedback inteligente e colaboração real entre alunos e professores.</p>
        <div className="esquerdo-badge">
          <span className="esquerdo-badge-dot">●</span>
          Conforme com a LGPD
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="lado-direito">
        <h1>Bem-vindo de volta</h1>
        <p className="subtitulo">Insira seus dados para acessar sua conta.</p>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            required
          />

          <div className="label-senha">
            <label>Senha</label>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button type="submit" className="botao-login">
            Entrar →
          </button>
        </form>

        <p className="cadastro">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>

    </div>
  );
}

export default Login;