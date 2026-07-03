import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <Login onLoginSuccess={() => setLogado(true)} />;
  }

  return <Dashboard />;
}