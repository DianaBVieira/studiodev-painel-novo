import React, { useState } from 'react';
import { 
  Folder, 
  Users, 
  DollarSign, 
  Layers, 
  ChevronRight, 
  HelpCircle, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LayoutDashboard,
  Settings,
  LogOut
} from 'lucide-react';

// Tipagem dos dados
interface Projeto {
  id: string;
  nome: string;
  cliente: string;
  descricao: string;
  status: 'briefing' | 'ui_ux' | 'desenvolvimento' | 'homologacao' | 'lancamento';
  dataLimite: string;
  prioridade: 'Baixa' | 'Média' | 'Alta';
}

interface Cliente {
  id: string;
  nome: string;
  whatsapp: string;
  valor: string;
}

export default function Dashboard() {
  // Estados do Sistema
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
  const [novoProjeto, setNovoProjeto] = useState({ nome: '', cliente: '', descricao: '', status: 'briefing', dataLimite: '', prioridade: 'Média' });
  const [novoCliente, setNovoCliente] = useState({ nome: '', whatsapp: '', valor: '' });
  const [abaAtiva, setAbaAtiva] = useState<'dashboard' | 'crm'>('dashboard');
  const [sidebarAberta, setSidebarAberta] = useState(true);

  // Configuração de Cores por Estágio (Estilo Monday.com)
  const colunasConfig = {
    briefing: { titulo: 'Pronto para Desenvolvimento / Briefing', cor: '#0070F3', bgLight: 'rgba(0, 112, 243, 0.1)', border: 'border-blue-500' },
    ui_ux: { titulo: 'Necessita Design / UI-UX', cor: '#7928CA', bgLight: 'rgba(121, 40, 202, 0.1)', border: 'border-purple-500' },
    desenvolvimento: { titulo: 'Em Desenvolvimento / Feito', cor: '#00DFD8', bgLight: 'rgba(0, 223, 216, 0.1)', border: 'border-cyan-500' },
    homologacao: { titulo: 'Aguardando Revisão / Testes', cor: '#FF4081', bgLight: 'rgba(255, 64, 129, 0.1)', border: 'border-pink-500' },
    lancamento: { titulo: 'Lançamento / Concluído', cor: '#00E676', bgLight: 'rgba(0, 230, 118, 0.1)', border: 'border-green-500' }
  };

  // Handlers
  const adicionarProjeto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoProjeto.nome) return;
    const projeto: Projeto = {
      id: `PRJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      ...novoProjeto,
      status: novoProjeto.status as any,
      prioridade: novoProjeto.prioridade as any
    };
    setProjetos([...projetos, projeto]);
    setNovoProjeto({ nome: '', cliente: '', descricao: '', status: 'briefing', dataLimite: '', prioridade: 'Média' });
  };

  const adicionarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCliente.nome) return;
    const cliente: Cliente = {
      id: String(Date.now()),
      ...novoCliente
    };
    setClientes([...clientes, cliente]);
    setNovoCliente({ nome: '', whatsapp: '', valor: '' });
  };

  const moverProjeto = (id: string, novoStatus: any) => {
    setProjetos(projetos.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex font-sans antialiased">
      
      {/* SIDEBAR LATERAL (Estilo Ploomes) */}
      <aside className={`${sidebarAberta ? 'w-64' : 'w-20'} bg-[#111827] border-r border-slate-800 transition-all duration-300 flex flex-col justify-between z-20`}>
        <div>
          {/* Logo */}
          <div className="p-5 flex items-center gap-3 border-b border-slate-800">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              SD
            </div>
            {sidebarAberta && (
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-wide text-white">StudioDev</h1>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
                </span>
              </div>
            )}
          </div>

          {/* Links de Navegação */}
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setAbaAtiva('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${abaAtiva === 'dashboard' ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <LayoutDashboard size={20} />
              {sidebarAberta && <span>Dashboard / Kanban</span>}
            </button>
            <button 
              onClick={() => setAbaAtiva('crm')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${abaAtiva === 'crm' ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Users size={20} />
              {sidebarAberta && <span>Gestão CRM</span>}
            </button>
          </nav>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setSidebarAberta(!sidebarAberta)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition"
          >
            {sidebarAberta ? 'Recolher Menu' : '➔'}
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER SUPERIOR */}
        <header className="h-20 bg-[#111827]/80 backdrop-blur border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {abaAtiva === 'dashboard' ? 'Painel de Controle Operacional' : 'Gestão de Clientes (CRM)'}
            </h2>
            <p className="text-xs text-slate-400">Controle de fluxos, prazos e sprint atual</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Conectado ao Supabase
            </div>
          </div>
        </header>

        {/* CONTAINER COM ROLAGEM */}
        <div className="p-8 flex-1 overflow-y-auto space-y-8">
          
          {/* SEÇÃO 1: METRICAS E ESTATÍSTICAS (Estilo Moderno) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Folder size={24} /></div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Projetos Ativos</p>
                <p className="text-2xl font-bold text-white">{projetos.length}</p>
              </div>
            </div>
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl"><Users size={24} /></div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Clientes Cadastrados</p>
                <p className="text-2xl font-bold text-white">{clientes.length}</p>
              </div>
            </div>
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign size={24} /></div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Valor em Contratos</p>
                <p className="text-2xl font-bold text-white">
                  R$ {clientes.reduce((acc, c) => acc + (parseFloat(c.valor) || 0), 0).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="bg-[#151D30] border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Clock size={24} /></div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Entregas Este Mês</p>
                <p className="text-2xl font-bold text-white">
                  {projetos.filter(p => p.status === 'homologacao' || p.status === 'lancamento').length}
                </p>
              </div>
            </div>
          </div>

          {/* ABA DO KANBAN / DASHBOARD */}
          {abaAtiva === 'dashboard' && (
            <>
              {/* FORMULÁRIO DE CADASTRO DE PROJETO */}
              <form onSubmit={adicionarProjeto} className="bg-[#151D30] border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Plus className="text-indigo-400" size={18} />
                  <h3 className="font-semibold text-sm text-white">Cadastrar Novo Projeto</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nome do Projeto / Produto" 
                    value={novoProjeto.nome}
                    onChange={e => setNovoProjeto({...novoProjeto, nome: e.target.value})}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                  <select 
                    value={novoProjeto.cliente}
                    onChange={e => setNovoProjeto({...novoProjeto, cliente: e.target.value})}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  >
                    <option value="">-- Selecione o Cliente --</option>
                    {clientes.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                    {clientes.length === 0 && <option value="Cliente Padrão">Cliente Provisório (Nenhum CRM cadastrado)</option>}
                  </select>
                  <input 
                    type="date" 
                    value={novoProjeto.dataLimite}
                    onChange={e => setNovoProjeto({...novoProjeto, dataLimite: e.target.value})}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Descrição do escopo ou objetivo principal" 
                    value={novoProjeto.descricao}
                    onChange={e => setNovoProjeto({...novoProjeto, descricao: e.target.value})}
                    className="md:col-span-2 bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/10">
                    Criar Projeto Operacional
                  </button>
                </div>
              </form>

              {/* MODELO KANBAN COM CORES DINÂMICAS (Estilo Monday.com) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
                {(Object.keys(colunasConfig) as Array<keyof typeof colunasConfig>).map(chaveStatus => {
                  const config = colunasConfig[chaveStatus];
                  const projetosFiltrados = projetos.filter(p => p.status === chaveStatus);

                  return (
                    <div key={chaveStatus} className="bg-[#111827] rounded-2xl border border-slate-800 p-3 min-w-[250px] shadow-sm">
                      
                      {/* Topo da Coluna Colorido Estilo Fita */}
                      <div 
                        className="p-3 rounded-xl mb-4 font-bold text-xs text-white uppercase tracking-wider shadow-inner text-center"
                        style={{ backgroundColor: config.cor }}
                      >
                        {config.titulo.split(' / ')[0]} ({projetosFiltrados.length})
                      </div>

                      {/* Lista de Cards da Coluna */}
                      <div className="space-y-3 min-h-[350px]">
                        {projetosFiltrados.map(projeto => (
                          <div 
                            key={projeto.id} 
                            className={`bg-[#151D30] border-l-4 ${config.border} p-4 rounded-xl shadow-md hover:translate-y-[-2px] transition-all space-y-3`}
                          >
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-800 px-2 py-0.5 rounded">
                                {projeto.id}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                projeto.prioridade === 'Alta' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {projeto.prioridade}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm text-white leading-tight">{projeto.nome}</h4>
                              <p className="text-xs text-indigo-400 font-medium mt-1">👤 {projeto.cliente || 'Sem cliente'}</p>
                              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{projeto.descricao}</p>
                            </div>

                            {/* Barra de Progresso Simbólica interna baseada na coluna */}
                            <div className="w-full bg-slate-800 rounded-full h-1 mt-1">
                              <div 
                                className="h-1 rounded-full transition-all duration-500" 
                                style={{ 
                                  backgroundColor: config.cor,
                                  width: chaveStatus === 'briefing' ? '15%' : chaveStatus === 'ui_ux' ? '40%' : chaveStatus === 'desenvolvimento' ? '65%' : chaveStatus === 'homologacao' ? '85%' : '100%'
                                }}
                              ></div>
                            </div>

                            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} /> {projeto.dataLimite || 'Sem prazo'}
                              </span>
                              
                              {/* Botão de Avanço Rápido */}
                              <select
                                value={projeto.status}
                                onChange={(e) => moverProjeto(projeto.id, e.target.value)}
                                className="bg-[#0B0F19] text-slate-300 border border-slate-700 rounded px-1 py-0.5 text-[10px] focus:outline-none focus:border-indigo-500"
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

                        {projetosFiltrados.length === 0 && (
                          <div className="h-32 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600 font-medium">
                            Nenhum projeto aqui
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ABA DE GESTÃO DO CRM */}
          {abaAtiva === 'crm' && (
            <div className="space-y-6">
              {/* Form de Clientes */}
              <form onSubmit={adicionarCliente} className="bg-[#151D30] border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Users className="text-emerald-400" size={18} />
                  <h3 className="font-semibold text-sm text-white">Cadastrar Novo Cliente no CRM</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nome do Cliente / Empresa" 
                    value={novoCliente.nome}
                    onChange={e => setNovoCliente({...novoCliente, nome: e.target.value})}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                  <input 
                    type="text" 
                    placeholder="WhatsApp / Telefone" 
                    value={novoCliente.whatsapp}
                    onChange={e => setNovoCliente({...novoCliente, whatsapp: e.target.value})}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                  <input 
                    type="number" 
                    placeholder="Valor do Projeto (R$)" 
                    value={novoCliente.valor}
                    onChange={e => setNovoCliente({...novoCliente, valor: e.target.value})}
                    className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-emerald-600/10">
                    Adicionar Novo Cliente
                  </button>
                </div>
              </form>

              {/* Tabela de Clientes */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#151D30] border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="p-4">Nome do Cliente</th>
                      <th className="p-4">WhatsApp / Contato</th>
                      <th className="p-4">Valor do Projeto</th>
                      <th className="p-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {clientes.map(cliente => (
                      <tr key={cliente.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 font-semibold text-white">{cliente.nome}</td>
                        <td className="p-4 text-slate-300">💬 {cliente.whatsapp}</td>
                        <td className="p-4 text-emerald-400 font-mono font-medium">R$ {parseFloat(cliente.valor || '0').toLocaleString('pt-BR')}</td>
                        <td className="p-4 text-center">
                          <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-md">Ativo</span>
                        </td>
                      </tr>
                    ))}
                    {clientes.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500 text-xs font-medium">
                          Nenhum cliente cadastrado ainda. Use o formulário acima!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
