import React from 'react';
import './bannerTurma.css';

// Recebemos as informações via "props"
function BannerTurma({ nome, disciplina, subtitulo, cor, codigo, ehProfessor }) {
  return (
    <div className="banner-turma-reutilizavel" style={{ backgroundColor: cor }}>
      <div className="banner-conteudo">
        <div className="banner-texto">
          <h1>{nome}</h1>
          <p>{disciplina}</p>
          <span className="subtitulo-extra">{subtitulo}</span>
        </div>

        {/* Só mostra o quadro do código se ehProfessor for true */}
        {ehProfessor && (
          <div className="banner-codigo-wrapper">
            <small>CÓDIGO DA TURMA</small>
            <strong>{codigo}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default BannerTurma;