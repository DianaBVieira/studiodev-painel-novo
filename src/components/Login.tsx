import { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'adm123' && password === 'adm123') {
      onLoginSuccess();
    } else {
      setError('Credenciais incorretas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-sans">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold mb-2 text-center text-indigo-400">
          StudioDev
        </h2>
        <p className="text-slate-400 text-sm text-center mb-6">
          Gerencie seus projetos e clientes
        </p>

        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 text-white"
              placeholder="adm123"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-all"
          >
            Entrar no Painel
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() =>
              alert(
                'Para redefinir a senha, verifique as configurações no painel do Supabase.'
              )
            }
            className="text-sm text-indigo-400 hover:underline"
          >
            Esqueceu a senha? Redefinir
          </button>
        </div>
      </div>
    </div>
  );
}
