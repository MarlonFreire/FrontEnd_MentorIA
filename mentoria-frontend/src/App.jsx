import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardProfessor from './pages/dashboards/dashboardProfessor';
import DashboardAluno from './pages/dashboards/dashboardAluno';
import Login from './pages/autenticacao/login';
import Cadastro from './pages/autenticacao/cadastro';
import LandingPage from './pages/landingPage/LandingPage';
import Redacao from "./pages/redacaoAluno/EnvioRedacao";
import VerRedacao from "./pages/redacaoAluno/VerRedacao"; 
import VisualizarRedacao from "./pages/redacaoProfessor/VisualizarRedacao";
import DetalhesTurmaProfessor from './pages/detalhesTurma/DetalhesTurmaProfessor';
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
        <Route path="/enviar-redacao/:idTurma" element={<Redacao />} />
        <Route path="/ver-redacao/:idRedacao" element={<VerRedacao />} />        
        <Route path="/corrigir-redacao/:idRedacao" element={<VisualizarRedacao />} />
        <Route path="/turma-professor/:id" element={<DetalhesTurmaProfessor />} />
        <Route path="/turma-aluno/:id" element={<DetalhesTurmaAluno />} />
      </Routes>
    </Router>
  );
}

export default App;