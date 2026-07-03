import React, { useState } from 'react';
import { 
  Folder, 
  Users, 
  DollarSign, 
  Clock, 
  LayoutDashboard
} from 'lucide-react';

interface Projeto {
  id: string;
  nome: string;
  cliente: string;
  descricao: string;
  status: string;
  dataLimite: string;
  prioridade: string;
}

interface Cliente {
  id: string;
  nome: string;
  whatsapp: string;
  valor: string;
}

type EstagioKey = 'briefing' | 'ui_ux' | 'desenvolvimento' | 'homologacao' | 'lancamento';

export default function Dashboard() {
  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: 'PRJ-2026-001',
      nome: 'StudioDev Workspace',
      cliente: 'Diana Vieira',
      descricao: 'Desenvolvimento do novo painel operacional integrado.',
      status: 'briefing',
      dataLimite: '2026-07-20',
      prioridade: 'Alta'
    }
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nomeProj, setNomeProj] = useState('');
  const [clienteProj, setClienteProj] = useState('');
  const [descProj, setDescProj] = useState('');
  const [dataProj, setDataProj] = useState('');
  
  const [nomeCli, setNomeCli] = useState('');
  const [whatsCli, setWhatsCli] = useState('');
  const [valorCli, setValorCli] = useState('');

  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [sidebarAberta, setSidebarAberta] = useState(true);

  const colunasConfig: Record<EstagioKey, { titulo: string; cor: string; border: string }> = {
    briefing: { titulo: 'Pronto para Desenvolvimento / Briefing', cor: '#0070F3', border: 'border-blue-500' },
    ui_ux: { titulo: 'Necessita Design / UI-UX', cor: '#7928CA', border: 'border-purple-500' },
    desenvolvimento: { titulo: 'Em Desenvolvimento / Feito', cor: '#00DFD8', border: 'border-cyan-500' },
    homologacao: { titulo: 'Aguardando Revisão / Testes', cor: '#FF4081', border: 'border-pink-500' },
    lancamento: { titulo: 'Lançamento / Concluído', cor: '#00E676', border: 'border-green-500' }
  };

  const adicionarProjeto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeProj) return;
    const proj: Projeto = {
      id: `PRJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      nome: nomeProj,
      cliente: clienteProj || 'Cliente Geral',
      descricao: descProj,
      status: 'briefing',
      dataLimite: dataProj,
      prioridade: 'Média'
    };
    setProjetos([...projetos, proj]);
    setNomeProj('');
    setDescProj('');
    setDataProj('');
  };

  const adicionarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCli) return;
    const cli: Cliente = {
      id: String(Date.now()),
      nome: nomeCli,
      whatsapp: whatsCli,
      valor: valorCli
    };
    setClientes([...clientes, cli]);
    setNomeCli('');
    setWhatsCli('');
    setValorCli('');
  };

  const moverProjeto = (id: string, novoStatus: string) => {
    setProjetos(projetos.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex antialiased w-full overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className={`${sidebarAberta ? 'w-64' : 'w-20'} bg-[#111827] border-r border-slate-800 transition-all duration-300 flex flex-col justify-between z-20 shrink-0`}>
        <div>
          <div className="p-5 flex items-center gap-3 border-b border-slate-800">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
              SD
            </div>
            {sidebarAberta && (
              <div>
                <h1 className="font-bold text-lg text-white">StudioDev</h1>
                <span className="text-xs text-emerald-400 flex items-center gap-1">Online</span>
              </div>
            )}
          </div>

          <nav className="p-4 space-y-2">
            <button 
              type="button"
              onClick={() => setAbaAtiva('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${abaAtiva === 'dashboard' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <LayoutDashboard size={20} />
              {sidebarAberta && <span>Dashboard / Kanban</span>}
            </button>
            <button 
              type="button"
              onClick={() => setAbaAtiva('crm')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${abaAtiva === 'crm' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Users size={20} />
              {sidebarAberta && <span>Gestão CRM</span>}
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            type="button"
            onClick={() => setSidebarAberta(!sidebarAberta)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium"
          >
            {sidebarAberta ? 'Recolher Menu' : '➔'}
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-[#111827]/80 backdrop-blur border-b border-slate-800 px-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {abaAtiva === 'dashboard' ? 'Painel de Controle Operacional' : 'Gestão de Clientes (CRM)'}
            </h2>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto space-y-8">
          
          {/* METRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Folder size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">Projetos Ativos</p>
                <p className="text-2xl font-bold text-white">{projetos.length}</p>
              </div>
            </div>
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl"><Users size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">Clientes CRM</p>
                <p className="text-2xl font-bold text-white">{clientes.length}</p>
              </div>
            </div>
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">Contratos</p>
                <p className="text-xl font-bold text-white">
                  R$ {clientes.reduce((acc, c) => acc + (parseFloat(c.valor) || 0), 0).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Clock size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">Fase Conclusão</p>
                <p className="text-2xl font-bold text-white">
                  {projetos.filter(p => p.status === 'homologacao' || p.status === 'lancamento').length}
                </p>
              </div>
            </div>
          </div>

          {abaAtiva === 'dashboard' ? (
            <>
              {/* FORM PROJETO */}
              <form onSubmit={adicionarProjeto} className="bg-[#151D30] border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nome do Projeto" 
                    value={nomeProj}
                    onChange={e => setNomeProj(e.target.value)}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  />
                  <select 
                    value={clienteProj}
                    onChange={e => setClienteProj(e.target.value)}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="">-- Selecione o Cliente --</option>
                    {clientes.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                    {clientes.length === 0 && <option value="Diana Vieira">Diana Vieira (Provisório)</option>}
                  </select>
                  <input 
                    type="date" 
                    value={dataProj}
                    onChange={e => setDataProj(e.target.value)}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Descrição do escopo" 
                    value={descProj}
                    onChange={e => setDescProj(e.target.value)}
                    className="md:col-span-2 bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  />
                  <button type="submit" className="bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500">
                    Criar Projeto
                  </button>
                </div>
              </form>

              {/* KANBAN */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
                {(Object.keys(colunasConfig) as EstagioKey[]).map(chave => {
                  const config = colunasConfig[chave];
                  const filtrados = projetos.filter(p => p.status === chave);

                  return (
                    <div key={chave} className="bg-[#111827] rounded-2xl border border-slate-800 p-3 min-w-[220px]">
                      <div 
                        className="p-2.5 rounded-xl mb-4 font-bold text-xs text-white uppercase text-center"
                        style={{ backgroundColor: config.cor }}
                      >
                        {config.titulo} ({filtrados.length})
                      </div>

                      <div className="space-y-3 min-h-[250px]">
                        {filtrados.map(p => (
                          <div key={p.id} className={`bg-[#151D30] border-l-4 ${config.border} p-4 rounded-xl space-y-3`}>
                            <h4 className="font-bold text-sm text-white leading-tight">{p.nome}</h4>
                            <p className="text-xs text-indigo-400">👤 {p.cliente}</p>
                            <p className="text-xs text-slate-400">{p.descricao}</p>
                            
                            <div className="w-full bg-slate-800 h-1 rounded">
                              <div 
                                className="h-1 rounded transition-all" 
                                style={{ 
                                  backgroundColor: config.cor,
                                  width: chave === 'briefing' ? '20%' : chave === 'ui_ux' ? '40%' : chave === 'desenvolvimento' ? '60%' : chave === 'homologacao' ? '80%' : '100%'
                                }}
                              ></div>
                            </div>

                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                              <span className="text-slate-400">📅 {p.dataLimite || 'S/P'}</span>
                              <select
                                value={p.status}
                                onChange={(e) => moverProjeto(p.id, e.target.value)}
                                className="bg-[#0B0F19] text-slate-300 border border-slate-700 rounded px-1 text-[11px]"
                              >
                                <option value="briefing">Briefing</option>
                                <option value="ui_ux">UI/UX</option>
                                <option value="desenvolvimento">Dev</option>
                                <option value="homologacao">Testes</option>
                                <option value="lancamento">Concluído</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* CRM */
            <div className="bg-[#151D30] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  placeholder="Nome do Cliente" 
                  value={nomeCli} 
                  onChange={e => setNomeCli(e.target.value)}
                  className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                />
                <input 
                  type="text" 
                  placeholder="WhatsApp" 
                  value={whatsCli} 
                  onChange={e => setWhatsCli(e.target.value)}
                  className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                />
                <input 
                  type="number" 
                  placeholder="Valor" 
                  value={valorCli} 
                  onChange={e => setValorCli(e.target.value)}
                  className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <button type="button" onClick={adicionarCliente} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-500">
                Adicionar Cliente
              </button>

              <div className="mt-4 border-t border-slate-800 pt-4">
                {clientes.map(c => (
                  <div key={c.id} className="flex justify-between p-3 bg-[#111827] rounded-xl mb-2 text-sm">
                    <span className="font-bold text-white">{c.nome}</span>
                    <span className="text-slate-400">💬 {c.whatsapp}</span>
                    <span className="text-emerald-400 font-mono">R$ {parseFloat(c.valor || '0').toLocaleString('pt-BR')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
