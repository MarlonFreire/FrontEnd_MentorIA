import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/aluno/login';
import Cadastro from './pages/aluno/cadastro';
import LandingPage from './pages/landingPage/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;