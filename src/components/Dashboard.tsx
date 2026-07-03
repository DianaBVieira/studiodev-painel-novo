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

  // Configuração refinada com cores RGB para aplicação do efeito Glow (Sombra com brilho)
  const colunasConfig: Record<EstagioKey, { titulo: string; cor: string; border: string; glow: string }> = {
    briefing: { titulo: 'Pronto para Desenvolvimento / Briefing', cor: '#0070F3', border: 'border-blue-500', glow: 'shadow-[0_0_15px_rgba(0,112,243,0.15)]' },
    ui_ux: { titulo: 'Necessita Design / UI-UX', cor: '#7928CA', border: 'border-purple-500', glow: 'shadow-[0_0_15px_rgba(121,40,202,0.15)]' },
    desenvolvimento: { titulo: 'Em Desenvolvimento / Feito', cor: '#00DFD8', border: 'border-cyan-500', glow: 'shadow-[0_0_15px_rgba(0,223,216,0.15)]' },
    homologacao: { titulo: 'Aguardando Revisão / Testes', cor: '#FF4081', border: 'border-pink-500', glow: 'shadow-[0_0_15px_rgba(255,64,129,0.15)]' },
    lancamento: { titulo: 'Lançamento / Concluído', cor: '#00E676', border: 'border-green-500', glow: 'shadow-[0_0_15px_rgba(0,230,118,0.15)]' }
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
              {sidebarAberta && <span>Clientes</span>}
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
      <main className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        <header className="h-20 bg-[#111827]/80 backdrop-blur border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">
              {abaAtiva === 'dashboard' ? 'Painel de Controle Operacional' : 'Clientes'}
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
                <p className="text-xs text-slate-400">Clientes Ativos</p>
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
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Nome do Projeto</label>
                    <input 
                      type="text" 
                      placeholder="Nome do Projeto" 
                      value={nomeProj}
                      onChange={e => setNomeProj(e.target.value)}
                      className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Cliente Responsável</label>
                    <select 
                      value={clienteProj}
                      onChange={e => setClienteProj(e.target.value)}
                      className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                    >
                      <option value="">-- Selecione o Cliente --</option>
                      {clientes.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                      {clientes.length === 0 && <option value="Diana Vieira">Diana Vieira (Provisório)</option>}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Data de entrega</label>
                    <input 
                      type="date" 
                      value={dataProj}
                      onChange={e => setDataProj(e.target.value)}
                      className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Descrição do Escopo</label>
                    <input 
                      type="text" 
                      placeholder="Descreva brevemente o que será entregue..." 
                      value={descProj}
                      onChange={e => setDescProj(e.target.value)}
                      className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                    />
                  </div>
                  <button type="submit" className="bg-indigo-600 text-white rounded-xl h-[42px] text-sm font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
                    Criar Projeto
                  </button>
                </div>
              </form>

              {/* KANBAN COM RESPONSIVIDADE E LARGURAS FIXAS IGUAIS */}
              <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-800">
                <div className="flex gap-5 min-w-max px-1">
                  {(Object.keys(colunasConfig) as EstagioKey[]).map(chave => {
                    const config = colunasConfig[chave];
                    const filtrados = projetos.filter(p => p.status === chave);

                    return (
                      <div 
                        key={chave} 
                        className={`bg-[#111827] rounded-2xl border border-slate-800/60 p-4 w-[280px] shrink-0 transition-all duration-300 ${config.glow}`}
                      >
                        <div 
                          className="p-3 rounded-xl mb-4 font-bold text-xs text-white uppercase text-center shadow-inner tracking-wider"
                          style={{ backgroundColor: config.cor }}
                        >
                          {config.titulo.split(' / ')[0]} ({filtrados.length})
                        </div>

                        <div className="space-y-4 min-h-[320px]">
                          {filtrados.map(p => (
                            <div key={p.id} className={`bg-[#151D30] border-l-4 ${config.border} p-4 rounded-xl space-y-3 shadow-md hover:scale-[1.02] transition-transform`}>
                              <h4 className="font-bold text-sm text-white leading-tight">{p.nome}</h4>
                              <p className="text-xs text-indigo-400 font-medium">👤 {p.cliente}</p>
                              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{p.descricao}</p>
                              
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500" 
                                  style={{ 
                                    backgroundColor: config.cor,
                                    width: chave === 'briefing' ? '20%' : chave === 'ui_ux' ? '40%' : chave === 'desenvolvimento' ? '60%' : chave === 'homologacao' ? '80%' : '100%'
                                  }}
                                ></div>
                              </div>

                              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                                <span className="text-slate-400 font-medium">📅 {p.dataLimite || 'S/P'}</span>
                                <select
                                  value={p.status}
                                  onChange={(e) => moverProjeto(p.id, e.target.value)}
                                  className="bg-[#0B0F19] text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 text-[11px] focus:outline-none focus:border-indigo-500"
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
                          {filtrados.length === 0 && (
                            <div className="h-[200px] border-2 border-dashed border-slate-800/40 rounded-xl flex items-center justify-center text-xs text-slate-600">
                              Nenhum projeto aqui
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* NOVA TABELA DE VISUALIZAÇÃO DE PROJETOS CRIADOS */}
              <div className="bg-[#151D30] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Folder size={18} className="text-indigo-400" />
                    Lista de Projetos Ativos
                  </h3>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full font-medium">
                    {projetos.length} no total
                  </span>
                </div>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3 pl-2">ID</th>
                        <th className="pb-3">Projeto</th>
                        <th className="pb-3">Cliente</th>
                        <th className="pb-3">Estágio atual</th>
                        <th className="pb-3">Previsão de Entrega</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                      {projetos.map(p => (
                        <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 pl-2 font-mono text-xs text-slate-500">{p.id}</td>
                          <td className="py-3.5 font-semibold text-white">{p.nome}</td>
                          <td className="py-3.5 text-slate-400">{p.cliente}</td>
                          <td className="py-3.5">
                            <span 
                              className="text-xs px-2.5 py-1 rounded-full font-semibold inline-block text-white uppercase text-center"
                              style={{ backgroundColor: colunasConfig[p.status as EstagioKey]?.cor || '#555' }}
                            >
                              {p.status === 'briefing' ? 'Briefing' : p.status === 'ui_ux' ? 'UI/UX' : p.status === 'desenvolvimento' ? 'Dev' : p.status === 'homologacao' ? 'Testes' : 'Concluído'}
                            </span>
                          </td>
                          <td className="py-3.5 font-medium text-slate-400">{p.dataLimite ? new Date(p.dataLimite).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'Não definida'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* CLIENTES */
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
                  placeholder="Valor do Contrato" 
                  value={valorCli} 
                  onChange={e => setValorCli(e.target.value)}
                  className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
              <button type="button" onClick={adicionarCliente} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-500 transition-colors">
                Adicionar Cliente
              </button>

              <div className="mt-4 border-t border-slate-800 pt-4">
                {clientes.map(c => (
                  <div key={c.id} className="flex justify-between p-3 bg-[#111827] rounded-xl mb-2 text-sm items-center">
                    <span className="font-bold text-white">{c.nome}</span>
                    <span className="text-slate-400">💬 {c.whatsapp}</span>
                    <span className="text-emerald-400 font-mono font-semibold">R$ {parseFloat(c.valor || '0').toLocaleString('pt-BR')}</span>
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
