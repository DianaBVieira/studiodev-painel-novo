import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvyaorcxwqsbubpnhjkj.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2eWFvcmN4d3FzYnVicG5oamtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzY1NzQsImV4cCI6MjA5ODUxMjU3NH0.EPLg2ZO3MOi5gb-qszekfS71rz5W0980Kwro7-pWZ4U';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface LinkDinamico {
  nome: string;
  url: string;
}

interface Projeto {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  fase:
    | 'Briefing'
    | 'UI/UX'
    | 'Desenvolvimento'
    | 'QA/Testes'
    | 'Homologação'
    | 'Lançamento';
  status: 'Pausado' | 'Em Andamento' | 'Aguardando Cliente' | 'Concluído';
  prd_url?: string;
  github_url?: string;
  figma_url?: string;
  staging_url?: string;
  data_entrega?: string;
  cliente_id: number;
}

interface Cliente {
  id: number;
  nome: string;
  whatsapp: string;
  valor_projeto: number;
  created_at: string;
}

// TEXTOS DE AJUDA PARA CADA FASE DO KANBAN
const explicacoesFases: Record<
  Projeto['fase'],
  { oQueE: string; criterioSaida: string }
> = {
  Briefing: {
    oQueE:
      'Fase de descoberta e entendimento. Coleta de requisitos e alinhamento de escopo.',
    criterioSaida:
      'Documento de PRD em PDF anexado ao card e aprovado por ambas as partes.',
  },
  'UI/UX': {
    oQueE:
      'Fase de design de experiência e interface. Onde a ideia ganha forma visual.',
    criterioSaida:
      'Protótipo navegável de alta fidelidade finalizado e validado no Figma.',
  },
  Desenvolvimento: {
    oQueE:
      'Engenharia e programação. Criação do código principal, banco de dados e APIs.',
    criterioSaida:
      'Funcionalidades codificadas de acordo com o PRD e enviadas ao GitHub.',
  },
  'QA/Testes': {
    oQueE:
      'Garantia de Qualidade. Testes rigorosos de usabilidade, bugs e responsividade.',
    criterioSaida:
      'Nenhum bug crítico aberto e sistema homologado pelo time interno.',
  },
  Homologação: {
    oQueE:
      'O cliente faz o test-drive final do software em um ambiente restrito de testes.',
    criterioSaida:
      "Aprovação por escrito ('de acordo') do cliente no link de Staging.",
  },
  Lançamento: {
    oQueE:
      'Go-Live! Configuração de domínios oficiais e publicação do projeto para produção.',
    criterioSaida:
      'Projeto no ar, estável e entregue oficialmente ao cliente com sucesso.',
  },
};

export default function Dashboard() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [novoNome, setNovoNome] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState<string>('');

  const [nomeCliente, setNomeCliente] = useState('');
  const [whatsappCliente, setWhatsappCliente] = useState('');
  const [valorProjeto, setValorProjeto] = useState('');

  const [enviandoId, setEnviandoId] = useState<string | null>(null);
  const [editandoLinksId, setEditandoLinksId] = useState<string | null>(null);

  const [linksTemporarios, setLinksTemporarios] = useState<LinkDinamico[]>([]);
  const [novoNomeLink, setNovoNomeLink] = useState('');
  const [novaUrlLink, setNovaUrlLink] = useState('');

  // NOVO ESTADO: Controla qual coluna exibe o balão de ajuda explicativa
  const [faseAjudaAberta, setFaseAjudaAberta] = useState<
    Projeto['fase'] | null
  >(null);

  const fasesKanban: Projeto['fase'][] = [
    'Briefing',
    'UI/UX',
    'Desenvolvimento',
    'QA/Testes',
    'Homologação',
    'Lançamento',
  ];

  useEffect(() => {
    buscarProjetos();
    buscarClientes();
  }, []);

  async function buscarProjetos() {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setProjetos(data as Projeto[]);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  }

  async function buscarClientes() {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;
      if (data) setClientes(data as Cliente[]);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  }

  async function adicionarProjeto(e: React.FormEvent) {
    e.preventDefault();
    if (!novoNome.trim() || !clienteSelecionado) {
      alert('Por favor, preencha o Nome e selecione um Cliente!');
      return;
    }

    try {
      const anoAtual = new Date().getFullYear();
      const proximoNumero = String(projetos.length + 1).padStart(3, '0');
      const codigoAutomatico = `PRJ-${anoAtual}-${proximoNumero}`;

      const { data, error } = await supabase
        .from('projetos')
        .insert([
          {
            codigo: codigoAutomatico,
            nome: novoNome,
            descricao: novaDescricao,
            data_entrega: dataEntrega || null,
            cliente_id: Number(clienteSelecionado),
            fase: 'Briefing',
            status: 'Em Andamento',
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        setProjetos([data[0] as Projeto, ...projetos]);
        setNovoNome('');
        setNovaDescricao('');
        setDataEntrega('');
        setClienteSelecionado('');
      }
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      alert('Ops! Houve um erro ao salvar o projeto no banco.');
    }
  }

  async function adicionarCliente(e: React.FormEvent) {
    e.preventDefault();
    if (!nomeCliente.trim()) return;

    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert([
          {
            nome: nomeCliente,
            whatsapp: whatsappCliente,
            valor_projeto: valorProjeto ? parseFloat(valorProjeto) : 0,
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        setClientes([data[0] as Cliente, ...clientes]);
        setNomeCliente('');
        setWhatsappCliente('');
        setValorProjeto('');
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Erro ao salvar o cliente no Supabase.');
    }
  }

  async function atualizarFaseProjeto(id: string, novaFase: Projeto['fase']) {
    try {
      const { error } = await supabase
        .from('projetos')
        .update({ fase: novaFase })
        .eq('id', id);

      if (error) throw error;

      setProjetos(
        projetos.map((p) => (p.id === id ? { ...p, fase: novaFase } : p))
      );
    } catch (error) {
      console.error('Erro ao atualizar fase:', error);
    }
  }

  async function fazerUploadPRD(
    projetoId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setEnviandoId(projetoId);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${projetoId}-${Date.now()}.${fileExt}`;
      const filePath = `prd_files/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('prds')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('prds')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from('projetos')
        .update({ prd_url: publicUrl })
        .eq('id', projetoId);

      if (updateError) throw updateError;

      setProjetos(
        projetos.map((p) =>
          p.id === projetoId ? { ...p, prd_url: publicUrl } : p
        )
      );

      alert('PRD enviado e associado com sucesso! 📄');
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload do arquivo.');
    } finally {
      setEnviandoId(null);
    }
  }

  async function removerPRD(projetoId: string) {
    if (!confirm('Deseja realmente remover o documento PRD deste projeto?'))
      return;

    try {
      const { error } = await supabase
        .from('projetos')
        .update({ prd_url: null })
        .eq('id', projetoId);

      if (error) throw error;

      setProjetos(
        projetos.map((p) =>
          p.id === projetoId ? { ...p, prd_url: undefined } : p
        )
      );
    } catch (error) {
      console.error('Erro ao remover PRD:', error);
      alert('Não foi possível remover o documento.');
    }
  }

  function iniciarEdicaoLinksDinamicos(prj: Projeto) {
    setEditandoLinksId(prj.id);
    setNovoNomeLink('');
    setNovaUrlLink('');

    if (prj.staging_url) {
      try {
        const linksExistentes = JSON.parse(prj.staging_url);
        setLinksTemporarios(
          Array.isArray(linksExistentes) ? linksExistentes : []
        );
      } catch (e) {
        setLinksTemporarios([]);
      }
    } else {
      setLinksTemporarios([]);
    }
  }

  function adicionarLinkNaListaTemporaria() {
    if (!novoNomeLink.trim() || !novaUrlLink.trim()) {
      alert('Preencha o nome e a URL do link!');
      return;
    }

    let urlFormatada = novaUrlLink.trim();
    if (!/^https?:\/\//i.test(urlFormatada)) {
      urlFormatada = `https://${urlFormatada}`;
    }

    setLinksTemporarios([
      ...linksTemporarios,
      { nome: novoNomeLink.trim(), url: urlFormatada },
    ]);
    setNovoNomeLink('');
    setNovaUrlLink('');
  }

  function removerLinkDaListaTemporaria(index: number) {
    setLinksTemporarios(linksTemporarios.filter((_, i) => i !== index));
  }

  async function salvarLinksDinamicosNoBanco(projetoId: string) {
    try {
      const jsonString =
        linksTemporarios.length > 0 ? JSON.stringify(linksTemporarios) : null;

      const { error } = await supabase
        .from('projetos')
        .update({ staging_url: jsonString })
        .eq('id', projetoId);

      if (error) throw error;

      setProjetos(
        projetos.map((p) =>
          p.id === projetoId
            ? { ...p, staging_url: jsonString || undefined }
            : p
        )
      );

      setEditandoLinksId(null);
    } catch (error) {
      console.error('Erro ao salvar links dinâmicos:', error);
      alert('Erro ao atualizar os links personalizados.');
    }
  }

  const renderizarLinksDoCard = (stagingUrlString?: string) => {
    if (!stagingUrlString) return [];
    try {
      const parsed = JSON.parse(stagingUrlString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const obterNomeCliente = (id: number) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nome : 'Cliente Desconhecido';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              🪐 StudioDev Workspace
            </h1>
            <p className="text-slate-400 text-sm">
              Controle de Clientes, Projetos e Fases de Desenvolvimento
            </p>
          </div>
          <div className="bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Conectado ao Supabase
          </div>
        </div>

        {/* Dashboard de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Projetos Ativos
              </h3>
              <p className="text-2xl font-bold mt-2 text-indigo-400">
                {projetos.length} Projetos
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Divididos de acordo com as fases de progresso.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Faturamento Estimado CRM
              </h3>
              <p className="text-2xl font-bold mt-2 text-emerald-400">
                R${' '}
                {clientes
                  .reduce((acc, c) => acc + (c.valor_projeto || 0), 0)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Calculado dinamicamente com base nos contratos salvos.
            </p>
          </div>
        </div>

        {/* CADASTRO DE NOVO PROJETO */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-indigo-400">
            🚀 Cadastrar Novo Projeto
          </h2>
          <form
            onSubmit={adicionarProjeto}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <input
              type="text"
              required
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Nome do Projeto / Produto"
              className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <select
              required
              value={clienteSelecionado}
              onChange={(e) => setClienteSelecionado(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="">-- Selecione o Cliente --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              value={novaDescricao}
              onChange={(e) => setNovaDescricao(e.target.value)}
              placeholder="Descrição curta do objetivo do projeto"
              className="sm:col-span-3 bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="sm:col-span-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-2 rounded-lg transition-colors"
            >
              + Criar Projeto (Código Automático)
            </button>
          </form>
        </div>

        {/* KANBAN COM RECURSO DE HELPER INTELLIGENT (?) NAS RAIAS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            📊 Kanban de Fases dos Projetos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {fasesKanban.map((fase) => {
              const projetosDaFase = projetos.filter((p) => p.fase === fase);
              return (
                <div
                  key={fase}
                  className="bg-slate-950 border border-slate-800/60 rounded-xl p-3 flex flex-col min-w-[210px] space-y-3 relative"
                >
                  {/* TÍTULO DA RAIA COM BOTÃO DE INTERROGAÇÃO (?) */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {fase}
                      </span>
                      {/* Ícone de Ajuda Interativo */}
                      <button
                        onClick={() =>
                          setFaseAjudaAberta(
                            faseAjudaAberta === fase ? null : fase
                          )
                        }
                        title="Ver conceito desta fase"
                        className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center border font-bold transition-all ${
                          faseAjudaAberta === fase
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        ?
                      </button>
                    </div>
                    <span className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-bold">
                      {projetosDaFase.length}
                    </span>
                  </div>

                  {/* DROP-DOWN CONDICIONAL DO CONCEITO DA FASE */}
                  {faseAjudaAberta === fase && (
                    <div className="bg-indigo-950/90 border border-indigo-800/70 p-2.5 rounded-lg text-[11px] space-y-1.5 animate-fadeIn">
                      <div>
                        <span className="font-bold text-indigo-300 block">
                          💡 O que é:
                        </span>
                        <p className="text-slate-300 leading-normal">
                          {explicacoesFases[fase].oQueE}
                        </p>
                      </div>
                      <div className="pt-1 border-t border-indigo-900/60">
                        <span className="font-bold text-emerald-400 block">
                          🏁 Critério de Saída:
                        </span>
                        <p className="text-slate-300 leading-normal">
                          {explicacoesFases[fase].criterioSaida}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[520px]">
                    {projetosDaFase.length === 0 ? (
                      <p className="text-[11px] text-slate-600 text-center py-4 italic">
                        Vazio
                      </p>
                    ) : (
                      projetosDaFase.map((prj) => {
                        const listaLinks = renderizarLinksDoCard(
                          prj.staging_url
                        );
                        return (
                          <div
                            key={prj.id}
                            className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2.5 hover:border-slate-700 transition-all"
                          >
                            <div>
                              <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-900 px-1.5 py-0.5 rounded font-mono block w-max mb-1">
                                {prj.codigo}
                              </span>
                              <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">
                                {prj.nome}
                              </h4>
                              <p className="text-[11px] text-slate-400 font-medium">
                                {obterNomeCliente(prj.cliente_id)}
                              </p>
                            </div>

                            {/* Seletor do PRD */}
                            {prj.prd_url ? (
                              <div className="flex gap-1">
                                <a
                                  href={prj.prd_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] flex-1 text-center bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 py-1 rounded font-medium transition-colors"
                                >
                                  📄 Abrir PRD
                                </a>
                                <button
                                  onClick={() => removerPRD(prj.id)}
                                  className="bg-rose-950/50 hover:bg-rose-900 text-rose-400 border border-rose-900 text-xs px-2 rounded transition-colors"
                                >
                                  🗑️
                                </button>
                              </div>
                            ) : (
                              <label className="text-[11px] block text-center bg-slate-800 hover:bg-slate-700 text-slate-300 py-1 rounded cursor-pointer transition-colors border border-dashed border-slate-700">
                                {enviandoId === prj.id
                                  ? 'A enviar...'
                                  : '📁 Enviar PRD'}
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  disabled={enviandoId !== null}
                                  onChange={(e) => fazerUploadPRD(prj.id, e)}
                                  className="hidden"
                                />
                              </label>
                            )}

                            {/* Links Customizados */}
                            <div className="border-t border-b border-slate-800/60 py-2 space-y-2">
                              {listaLinks.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {listaLinks.map((lnk, idx) => (
                                    <a
                                      key={idx}
                                      href={lnk.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 px-2 py-0.5 rounded text-[10px] font-medium transition-all"
                                    >
                                      {lnk.nome}
                                    </a>
                                  ))}
                                </div>
                              )}

                              {editandoLinksId === prj.id ? (
                                <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-2 mt-1">
                                  <div className="text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-900">
                                    Links Cadastrados ({linksTemporarios.length}
                                    )
                                  </div>

                                  {linksTemporarios.map((lnk, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between items-center bg-slate-900 px-1.5 py-0.5 rounded text-[10px]"
                                    >
                                      <span className="truncate text-slate-300">
                                        {lnk.nome}
                                      </span>
                                      <button
                                        onClick={() =>
                                          removerLinkDaListaTemporaria(idx)
                                        }
                                        className="text-rose-400 font-bold hover:text-rose-300 px-1"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}

                                  <div className="space-y-1 pt-1">
                                    <input
                                      type="text"
                                      placeholder="Nome (ex: Supabase, Vercel)"
                                      value={novoNomeLink}
                                      onChange={(e) =>
                                        setNovoNomeLink(e.target.value)
                                      }
                                      className="w-full bg-slate-900 border border-slate-800 text-[10px] rounded px-1.5 py-1 focus:outline-none"
                                    />
                                    <input
                                      type="text"
                                      placeholder="URL do Link"
                                      value={novaUrlLink}
                                      onChange={(e) =>
                                        setNovaUrlLink(e.target.value)
                                      }
                                      className="w-full bg-slate-900 border border-slate-800 text-[10px] rounded px-1.5 py-1 focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={adicionarLinkNaListaTemporaria}
                                      className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-400 text-[9px] py-0.5 rounded font-bold border border-slate-700"
                                    >
                                      + Inserir Link na Lista
                                    </button>
                                  </div>

                                  <div className="flex gap-1 pt-1.5 border-t border-slate-900">
                                    <button
                                      onClick={() =>
                                        salvarLinksDinamicosNoBanco(prj.id)
                                      }
                                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] py-0.5 rounded font-bold"
                                    >
                                      Salvar Painel
                                    </button>
                                    <button
                                      onClick={() => setEditandoLinksId(null)}
                                      className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded"
                                    >
                                      Sair
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    iniciarEdicaoLinksDinamicos(prj)
                                  }
                                  className="w-full bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[10px] py-0.5 rounded transition-all font-medium flex justify-center items-center gap-1"
                                >
                                  🔗 Gerenciar Links Customizados
                                </button>
                              )}
                            </div>

                            {/* Seletor de fase */}
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-slate-500">
                                Mover:
                              </span>
                              <select
                                value={prj.fase}
                                onChange={(e) =>
                                  atualizarFaseProjeto(
                                    prj.id,
                                    e.target.value as Projeto['fase']
                                  )
                                }
                                className="bg-slate-950 border border-slate-800 text-[11px] text-slate-300 rounded px-1 py-0.5 focus:outline-none"
                              >
                                {fasesKanban.map((f) => (
                                  <option key={f} value={f}>
                                    {f}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CRM */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-200">
            👥 Gestão de Clientes (CRM)
          </h2>

          <form
            onSubmit={adicionarCliente}
            className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/60"
          >
            <input
              type="text"
              required
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              placeholder="Nome do Cliente"
              className="sm:col-span-2 bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              value={whatsappCliente}
              onChange={(e) => setWhatsappCliente(e.target.value)}
              placeholder="WhatsApp / Telefone"
              className="bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              value={valorProjeto}
              onChange={(e) => setValorProjeto(e.target.value)}
              placeholder="Valor do Projeto (R$)"
              className="bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="sm:col-span-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm py-2 rounded-lg transition-colors"
            >
              + Adicionar Novo Cliente
            </button>
          </form>

          <div className="overflow-x-auto">
            {clientes.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">
                Nenhum cliente cadastrado ainda.
              </p>
            ) : (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Contato</th>
                    <th className="px-4 py-3 text-right">Valor do Contrato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {clientes.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-medium text-slate-200">
                        {cliente.nome}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400">
                        {cliente.whatsapp || 'Não informado'}
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-emerald-400">
                        R${' '}
                        {(cliente.valor_projeto || 0).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
