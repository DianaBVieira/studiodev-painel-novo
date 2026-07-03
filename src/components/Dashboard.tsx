import React, { useState } from 'react';
import { 
  Folder, 
  Users, 
  DollarSign, 
  Clock, 
  LayoutDashboard,
  Link as LinkIcon,
  Download,
  Plus,
  Trash2
} from 'lucide-react';

interface LinkDinamico {
  label: string;
  url: string;
}

interface Projeto {
  id: string;
  nome: string;
  cliente: string;
  descricao: string;
  status: string;
  dataLimite: string;
  prioridade: string;
  links: LinkDinamico[];
  linkPRD?: string;
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
      prioridade: 'Alta',
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'Figma', url: 'https://figma.com' }
      ],
      linkPRD: '#'
    }
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 'CLI-001',
      nome: 'Diana Vieira',
      whatsapp: '+351 912 345 678',
      valor: '5000'
    }
  ]);

  // Estados do Formulário de Projetos
  const [nomeProj, setNomeProj] = useState('');
  const [clienteProj, setClienteProj] = useState('');
  const [descProj, setDescProj] = useState('');
  const [dataProj, setDataProj] = useState('');
  const [linkPRDInput, setLinkPRDInput] = useState('');
  
  // Lista temporária de links
  const [linksTemporarios, setLinksTemporarios] = useState<LinkDinamico[]>([]);
  const [labelLinkAtual, setLabelLinkAtual] = useState('');
  const [urlLinkAtual, setUrlLinkAtual] = useState('');

  // Estados do Formulário de Clientes
  const [nomeCli, setNomeCli] = useState('');
  const [whatsCli, setWhatsCli] = useState('');
  const [valorCli, setValorCli] = useState('');

  // Navegação
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [sidebarAberta, setSidebarAberta] = useState(true);

  const colunasConfig: Record<EstagioKey, { titulo: string; cor: string; border: string; glow: string }> = {
    briefing: { titulo: 'Pronto para Desenvolvimento / Briefing', cor: '#0070F3', border: 'border-blue-500', glow: 'shadow-[0_0_15px_rgba(0,112,243,0.15)]' },
    ui_ux: { titulo: 'Necessita Design / UI-UX', cor: '#7928CA', border: 'border-purple-500', glow: 'shadow-[0_0_15px_rgba(121,40,202,0.15)]' },
    desenvolvimento: { titulo: 'Em Desenvolvimento / Feito', cor: '#00DFD8', border: 'border-cyan-500', glow: 'shadow-[0_0_15px_rgba(0,223,216,0.15)]' },
    homologacao: { titulo: 'Aguardando Revisão / Testes', cor: '#FF4081', border: 'border-pink-500', glow: 'shadow-[0_0_15px_rgba(255,64,129,0.15)]' },
    lancamento: { titulo: 'Lançamento / Concluído', cor: '#00E676', border: 'border-green-500', glow: 'shadow-[0_0_15px_rgba(0,230,118,0.15)]' }
  };

  const adicionarLinkTemporario = () => {
    if (!labelLinkAtual || !urlLinkAtual) return;
    setLinksTemporarios([...linksTemporarios, { label: labelLinkAtual, url: urlLinkAtual }]);
    setLabelLinkAtual('');
    setUrlLinkAtual('');
  };

  const removerLinkTemporario = (index: number) => {
    setLinksTemporarios(linksTemporarios.filter((_, i) => i !== index));
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
      prioridade: 'Média',
      links: linksTemporarios,
      linkPRD: linkPRDInput || undefined
    };
    setProjetos([...projetos, proj]);
    setNomeProj('');
    setClienteProj('');
    setDescProj('');
    setDataProj('');
    setLinkPRDInput('');
    setLinksTemporarios([]);
  };

  const adicionarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCli) return;
    const cli: Cliente = {
      id: `CLI-${Math.floor(100 + Math.random() * 900)}`,
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

  const deletarLinkDoProjetoSalvo = (projetoId: string, linkIndex: number) => {
    setProjetos(projetos.map(p => {
      if (p.id === projetoId) {
        return { ...p, links: p.links.filter((_, i) => i !== linkIndex) };
      }
      return p;
    }));
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
              onClick={() => setAbaAtiva('projetos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${abaAtiva === 'projetos' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Folder size={20} />
              {sidebarAberta && <span>Projetos</span>}
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
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
              {abaAtiva === 'dashboard' ? 'Painel de Controle Operacional' : abaAtiva === 'projetos' ? 'Gestão de Projetos' : 'Clientes'}
            </h2>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto space-y-8">
          
          {/* CARDS DE MÉTRICAS */}
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

          {/* KANBAN */}
          {abaAtiva === 'dashboard' && (
            <div className="w-full overflow-x-auto pb-4">
              <div className="flex gap-5 min-w-max px-1">
                {(Object.keys(colunasConfig) as EstagioKey[]).map(chave => {
                  const config = colunasConfig[chave];
                  const filtrados = projetos.filter(p => p.status === chave);

                  return (
                    <div key={chave} className={`bg-[#111827] rounded-2xl border border-slate-800/60 p-4 w-[295px] shrink-0 transition-all duration-300 ${config.glow}`}>
                      <div className="p-3 rounded-xl mb-4 font-bold text-xs text-white uppercase text-center tracking-wider" style={{ backgroundColor: config.cor }}>
                        {config.titulo.split(' / ')[0]} ({filtrados.length})
                      </div>

                      <div className="space-y-4 min-h-[350px]">
                        {filtrados.map(p => (
                          <div key={p.id} className={`bg-[#151D30] border-l-4 ${config.border} p-4 rounded-xl space-y-3 shadow-md hover:scale-[1.02] transition-transform`}>
                            <h4 className="font-bold text-sm text-white leading-tight">{p.nome}</h4>
                            <p className="text-xs text-indigo-400 font-medium">👤 {p.cliente}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{p.descricao}</p>
                            
                            {p.links && p.links.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Ambientes e Links:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {p.links.map((link, idx) => (
                                    <div key={idx} className="flex items-center gap-1 bg-slate-800/90 hover:bg-slate-700/90 px-2 py-1 rounded text-[11px] transition-colors text-indigo-400 font-medium">
                                      <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                                        <LinkIcon size={11} /> {link.label}
                                      </a>
                                      <button type="button" onClick={() => deletarLinkDoProjetoSalvo(p.id, idx)} className="text-slate-500 hover:text-red-400 ml-1 pl-0.5">✕</button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {p.linkPRD && (
                              <div className="pt-1">
                                <a href={p.linkPRD} download className="flex items-center justify-center gap-1.5 text-[11px] w-full bg-indigo-950/40 hover:bg-indigo-900/40 py-1.5 rounded text-emerald-400 font-semibold transition-colors border border-emerald-500/20">
                                  <Download size={12} /> Baixar PRD (PDF)
                                </a>
                              </div>
                            )}

                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-500" style={{ backgroundColor: config.cor, width: chave === 'briefing' ? '20%' : chave === 'ui_ux' ? '40%' : chave === 'desenvolvimento' ? '60%' : chave === 'homologacao' ? '80%' : '100%' }}></div>
                            </div>

                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                              <span className="text-slate-400 font-medium">📅 {p.dataLimite || 'S/P'}</span>
                              <select value={p.status} onChange={(e) => moverProjeto(p.id, e.target.value)} className="bg-[#0B0F19] text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 text-[11px] focus:outline-none">
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
                          <div className="h-[200px] border-2 border-dashed border-slate-800/40 rounded-xl flex items-center justify-center text-xs text-slate-600">Nenhum projeto aqui</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABA 2: PROJETOS */}
          {abaAtiva === 'projetos' && (
            <div className="space-y-6">
              <form onSubmit={adicionarProjeto} className="bg-[#151D30] border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white mb-2">Cadastrar Novo Projeto</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Nome do Projeto</label>
                    <input type="text" placeholder="Ex: StudioDev Workspace" value={nomeProj} onChange={e => setNomeProj(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Cliente Responsável</label>
                    <select value={clienteProj} onChange={e => setClienteProj(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full">
                      <option value="">-- Selecione o Cliente --</option>
                      {clientes.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Data de entrega</label>
                    <input type="date" value={dataProj} onChange={e => setDataProj(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full" />
                  </div>
                </div>

                <div className="bg-[#0B0F19]/50 border border-slate-800 p-4 rounded-xl space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gerenciador de Ambientes e Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <input type="text" placeholder="Nome do link (Ex: Figma, GitHub)" value={labelLinkAtual} onChange={e => setLabelLinkAtual(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="url" placeholder="https://link.com" value={urlLinkAtual} onChange={e => setUrlLinkAtual(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white" />
                    <button type="button" onClick={adicionarLinkTemporario} className="bg-slate-800 text-indigo-400 border border-slate-700 font-semibold rounded-lg h-[34px] text-xs flex items-center justify-center gap-1 hover:bg-slate-700 transition-colors">
                      <Plus size={14} /> Incluir Link
                    </button>
                  </div>
                  {linksTemporarios.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                      {linksTemporarios.map((link, idx) => (
                        <span key={idx} className="flex items-center gap-2 bg-slate-800 px-2.5 py-1 rounded text-xs text-indigo-300">
                          <strong>{link.label}:</strong> {link.url}
                          <button type="button" onClick={() => removerLinkTemporario(idx)} className="text-red-400 hover:text-red-300 ml-1"><Trash2 size={12} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Link do Documento PRD (PDF)</label>
                    <input type="text" placeholder="Cole a URL para o arquivo PDF" value={linkPRDInput} onChange={e => setLinkPRDInput(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none w-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Descrição do Escopo</label>
                    <input type="text" placeholder="Escopo resumido..." value={descProj} onChange={e => setDescProj(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none w-full" />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-indigo-600 text-white rounded-xl h-[44px] px-8 text-sm font-semibold hover:bg-indigo-500 transition-colors shadow-lg">Criar Projeto</button>
                </div>
              </form>

              {/* TABELA DE PROJETOS */}
              <div className="bg-[#151D30] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2"><Folder size={18} className="text-indigo-400" /> Lista de Projetos Ativos</h3>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3 pl-2">ID</th>
                        <th className="pb-3">Projeto</th>
                        <th className="pb-3">Cliente</th>
                        <th className="pb-3">Estágio</th>
                        <th className="pb-3">Entrega</th>
                        <th className="pb-3 text-right pr-2">Total Links</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                      {projetos.map(p => (
                        <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 pl-2 font-mono text-xs text-slate-500">{p.id}</td>
                          <td className="py-3.5 font-semibold text-white">{p.nome}</td>
                          <td className="py-3.5 text-slate-400">{p.cliente}</td>
                          <td className="py-3.5">
                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold inline-block text-white uppercase text-center" style={{ backgroundColor: colunasConfig[p.status as EstagioKey]?.cor || '#555' }}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3.5 font-medium text-slate-400">{p.dataLimite ? new Date(p.dataLimite).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'S/P'}</td>
                          <td className="py-3.5 text-right pr-2 text-xs font-mono text-slate-500">{p.links.length} link(s)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: CLIENTES */}
          {abaAtiva === 'crm' && (
            <div className="space-y-6">
              <form onSubmit={adicionarCliente} className="bg-[#151D30] border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white mb-2">Cadastrar Novo Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Nome do Cliente</label>
                    <input type="text" placeholder="Nome" value={nomeCli} onChange={e => setNomeCli(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">WhatsApp</label>
                    <input type="text" placeholder="+351..." value={whatsCli} onChange={e => setWhatsCli(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium px-1">Valor Contrato</label>
                    <input type="number" placeholder="5000" value={valorCli} onChange={e => setValorCli(e.target.value)} className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
                  </div>
                </div>
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-500 transition-colors shadow-lg">Adicionar Cliente</button>
              </form>

              <div className="bg-[#151D30] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3 pl-2">ID</th>
                        <th className="pb-3">Nome</th>
                        <th className="pb-3">WhatsApp</th>
                        <th className="pb-3 text-right pr-2">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                      {clientes.map(c => (
                        <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 pl-2 font-mono text-xs text-slate-500">{c.id}</td>
                          <td className="py-3.5 font-semibold text-white">{c.nome}</td>
                          <td className="py-3.5 text-slate-400">💬 {c.whatsapp}</td>
                          <td className="py-3.5 text-right pr-2 text-emerald-400 font-mono font-semibold">R$ {parseFloat(c.valor || '0').toLocaleString('pt-BR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
