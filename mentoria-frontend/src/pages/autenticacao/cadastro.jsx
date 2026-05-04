import React, { useState } from 'react';
import './cadastro.css';
import { Link, useNavigate } from 'react-router-dom'; 

function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState('estudante');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); 

  const lidarComCadastro = async (e) => {
    e.preventDefault();

    try {
      // 1. Criar na tabela 'usuarios' (Login/Senha)
      const novoUser = { email, senha, tipo_usuario: tipoUsuario === 'estudante' ? 'aluno' : 'professor' };
      
      const respUser = await fetch('http://localhost:5000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUser)
      });
      const userCriado = await respUser.json();

      // 2. Criar na tabela específica (tb_professores ou tb_alunos)
      if (tipoUsuario === 'professor') {
        await fetch('http://localhost:5000/tb_professores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nome_professor: nome, 
            disciplina: "Geral", 
            id_usuario: userCriado.id 
          })
        });
        navigate('/login');
      } else {
        await fetch('http://localhost:5000/tb_alunos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nome_aluno: nome, 
            matricula: `MAT-${Math.floor(Math.random() * 1000)}`, 
            id_usuario: userCriado.id 
          })
        });
        navigate('/login');
      }
      alert("Cadastro realizado! Agora faça login.");
    } catch (error) {
      alert("Erro ao cadastrar!");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>Seja Bem-Vindo</h1>
        <p>Insira seus dados para criar sua conta no MentorIA.</p>

        <div className="abas-cadastro">
          <button className={tipoUsuario === 'estudante' ? 'aba-ativa' : ''} onClick={() => setTipoUsuario('estudante')}>🎓 Estudante</button>
          <button className={tipoUsuario === 'professor' ? 'aba-ativa' : ''} onClick={() => setTipoUsuario('professor')}>🧑‍🏫 Professor</button>
        </div>

        <form className="formulario" onSubmit={lidarComCadastro}>
          <label>Nome</label>
          <input type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />

          <label>Email</label>
          <input type="email" placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Senha</label>
          <input type="password" placeholder="********" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          
          <button type="submit" className="botao-entrar">
            Cadastrar como {tipoUsuario === 'estudante' ? 'Estudante' : 'Professor'} →
          </button>
        </form>

        <p className="voltar-login">Já possui uma conta? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Cadastro;