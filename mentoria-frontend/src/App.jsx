import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardProfessor from './pages/dashboards/dashboardProfessor';
import DashboardAluno from './pages/dashboards/dashboardAluno';
import Login from './pages/autenticacao/login';
import Cadastro from './pages/autenticacao/cadastro';
import LandingPage from './pages/landingPage/LandingPage';
import Redacao from "./pages/redacao/EnvioRedacao";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard-professor" element={<DashboardProfessor />} />
          <Route path="/dashboard-aluno" element={<DashboardAluno />} />
          <Route path="/enviar-redacao" element={<Redacao />} />
         
      </Routes>
    </Router>
  );
}

export default App;