import '../src/styles/App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
