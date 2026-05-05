import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardProfessor from './pages/dashboards/dashboardProfessor';
import DashboardAluno from './pages/dashboards/dashboardAluno';
import Login from './pages/autenticacao/login';
import Cadastro from './pages/autenticacao/cadastro';
import LandingPage from './pages/landingPage/LandingPage';
import RedacaoAluno from "./pages/redacaoAluno/EnvioRedacao";
import DetalhesTurma from './pages/components/DetalhesTurma';
import DetalhesTurmaProfessor from './pages/detalhesTurma/detalhesTurmaProfessor';
import DetalhesTurmaAluno from './pages/detalhesTurma/DetalhesTurmaAluno';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard-professor" element={<DashboardProfessor />} />
          <Route path="/dashboard-aluno" element={<DashboardAluno />} />
          <Route path="/enviar-redacao" element={<RedacaoAluno />} />
          <Route path="/detalhes-turma/:id" element={<DetalhesTurma />} />
          <Route path="/turma-professor/:id" element={<DetalhesTurmaProfessor />} />
          <Route path="/turma-aluno/:id" element={<DetalhesTurmaAluno />} />
         
      </Routes>
    </Router>
  
  );
}

export default App;