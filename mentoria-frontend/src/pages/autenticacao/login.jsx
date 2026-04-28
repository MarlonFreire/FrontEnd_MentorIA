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
    // 1. Buscamos apenas pelo email para evitar erros de acento na URL
    const resposta = await fetch(`http://localhost:5000/usuarios?email=${email}`);
    const usuarios = await resposta.json();

    // 2. Verificamos se achou o usuário e se a senha bate
    if (usuarios.length > 0 && usuarios[0].senha === senha) {
      const user = usuarios[0];
      
      // Salva a sessão
      localStorage.setItem('usuarioLogado', JSON.stringify(user));

      // 3. Verifica o tipo ignorando maiúsculas/minúsculas e acentos
      // Usamos o nome exato que está no seu print: "tipo_usuário"
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
      <div className="lado-esquerdo">
        <img src={imagemLateral} alt="Logo MentorIA" className="logo-png" />
        <h2>Aprimore sua escrita com IA</h2>
        <p>Feedback inteligente e colaboração real entre alunos e professores.</p>
      </div>

      <div className="lado-direito">
        <h1>Bem-vindo de volta</h1>
        <p className="subtitulo">Insira seus dados para acessar sua conta.</p>

        <div className="abas">
          <button className={tipoUsuario === 'estudante' ? 'aba-ativa' : ''} onClick={() => setTipoUsuario('estudante')}>🎓 Estudante</button>
          <button className={tipoUsuario === 'professor' ? 'aba-ativa' : ''} onClick={() => setTipoUsuario('professor')}>🧑‍🏫 Professor</button>
        </div>

        <form className="formulario" onSubmit={lidarComLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" required />

          <div className="label-senha">
            <label>Senha</label>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="********" required />

          <button type="submit" className="botao-login">Login →</button>
        </form>

        <p className="cadastro">Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </div>
    </div>
  );
}

export default Login;