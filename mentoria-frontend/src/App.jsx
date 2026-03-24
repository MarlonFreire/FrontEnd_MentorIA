import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/aluno/loginAluno';
import Cadastro from './pages/aluno/cadastroAluno'; // Crie esse arquivo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;