import React, { useState } from "react";
import { ChevronLeft, Download, Flame, BookOpen, FileText, ClipboardCheck, ScrollText } from "lucide-react";

/* ==========================================================================
   CONFIGURAÇÃO CENTRAL - BIZU MILITAR FÊNIX
   ========================================================================== */
const BASE_URL = "https://ivespe-cpu.github.io/bizu-militar-fenix";

const CONFIG_ESCOLAS = {
  "COLÉGIO NAVAL": {
    slug: "cn",
    banner: "cn.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA", "BIOLOGIA"],
  },
  "CMRJ – 6º ANO": {
    slug: "cmrj",
    banner: "cmrj.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"],
    possuiManual: true // Ativa o card especial do Manual do Aluno
  },
  "EPCAR": {
    slug: "epcar",
    banner: "epcar.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS"],
  },
  "EsPCEX": {
    slug: "espcex",
    banner: "espcex.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA"],
  },
  "EEAR": {
    slug: "eear1", // Mantido eear1 conforme sua estrutura de pastas
    banner: "eear1.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "FÍSICA"],
  },
  "ESA": {
    slug: "esa",
    banner: "esa.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA"],
  },
};

export default function Dashboard() {
  const [moduloAtivo, setModuloAtivo] = useState("menu");
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);

  // Formata nomes como "MATEMÁTICA" para "matematica"
  const formatarNomeArquivo = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  };

  const abrirPDF = (materia) => {
    const mat = formatarNomeArquivo(materia);
    const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
    window.open(`${BASE_URL}/pdf/${mat}_${slug}.pdf`, "_blank");
  };

  const abrirDocumentoExtra = (tipo) => {
    const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
    window.open(`${BASE_URL}/pdf/${tipo}_${slug}.pdf`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* HEADER */}
      <header className="bg-[#0f172a] border-b-4 border-orange-600 p-5 flex items-center justify-between shadow-2xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Flame className="text-orange-500 animate-pulse" />
          <h1 className="font-black italic text-xl tracking-tighter text-orange-500">BIZÚ MILITAR FÊNIX</h1>
        </div>
        <div className="text-[10px] font-bold text-orange-400 border border-orange-600/30 px-3 py-1 rounded-full bg-orange-600/5">
          PLATAFORMA DE ELITE v2.0
        </div>
      </header>

      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        
        {/* MENU DE ESCOLAS */}
        {moduloAtivo === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(CONFIG_ESCOLAS).map(([nome, dados]) => (
              <button
                key={nome}
                onClick={() => {
                  setEscolaSelecionada(nome);
                  setModuloAtivo("apostilas");
                }}
                className="relative h-64 rounded-3xl overflow-hidden border-2 border-white/5 hover:border-orange-600 transition-all group shadow-xl"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `url(${BASE_URL}/jpg/${dados.banner}) center / cover no-repeat`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 group-hover:bg-black/40 transition-colors"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                  <h2 className="text-3xl font-black text-white text-center italic tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,1)] group-hover:text-orange-500 transition-colors">
                    {nome}
                  </h2>
                  <div className="mt-4 w-12 h-1 bg-orange-600 rounded-full group-hover:w-24 transition-all duration-500"></div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ÁREA DE APOSTILAS / MATERIAIS */}
        {moduloAtivo === "apostilas" && (
          <div className="animate-in fade-in duration-500">
            <button
              onClick={() => setModuloAtivo("menu")}
              className="mb-8 flex items-center gap-2 text-white/60 hover:text-orange-500 transition-colors font-bold uppercase text-xs tracking-widest"
            >
              <ChevronLeft size={18} /> Voltar ao Centro de Comando
            </button>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-orange-500 font-black text-xs tracking-[0.3em] uppercase">Material de Estudo</span>
                <h2 className="text-5xl font-black italic tracking-tighter uppercase mt-2">
                  {escolaSelecionada}
                </h2>
              </div>
              
              {/* BOTÕES DE ACESSO RÁPIDO - TOPO */}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => abrirDocumentoExtra('edital')} className="group bg-white/5 border border-orange-600/30 text-white hover:bg-orange-600 hover:text-black px-5 py-3 rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 transition-all">
                  <ScrollText size={14} className="group-hover:rotate-12 transition-transform"/> EDITAL
                </button>
                <button onClick={() => abrirDocumentoExtra('provas_anteriores')} className="group bg-white/5 border border-orange-600/30 text-white hover:bg-orange-600 hover:text-black px-5 py-3 rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 transition-all">
                  <FileText size={14} className="group-hover:rotate-12 transition-transform"/> PROVAS
                </button>
                <button onClick={() => abrirDocumentoExtra('gabaritos')} className="group bg-white/5 border border-orange-600/30 text-white hover:bg-orange-600 hover:text-black px-5 py-3 rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 transition-all">
                  <ClipboardCheck size={14} className="group-hover:rotate-12 transition-transform"/> GABARITOS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* CARD ESPECIAL: MANUAL DO ALUNO (CMRJ) */}
              {CONFIG_ESCOLAS[escolaSelecionada].possuiManual && (
                <div className="rounded-3xl overflow-hidden bg-[#0f172a] border-2 border-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.2)] group transition-all hover:-translate-y-2">
                  <div className="h-56 bg-black p-4 flex items-center justify-center relative">
                    <div className="absolute top-4 left-4 bg-orange-600 text-[10px] font-black px-2 py-1 rounded shadow-lg z-10 animate-bounce">ESSENCIAL</div>
                    <img 
                      src={`${BASE_URL}/png/manual_${CONFIG_ESCOLAS[escolaSelecionada].slug}.png`} 
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=MANUAL+DO+ALUNO"; }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-black text-sm mb-4 text-orange-400 uppercase tracking-widest">Manual do Aluno</h3>
                    <button
                      onClick={() => window.open(`${BASE_URL}/pdf/manual_${CONFIG_ESCOLAS[escolaSelecionada].slug}.pdf`, "_blank")}
                      className="w-full bg-orange-600 hover:bg-white text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Download size={18} /> LER DOCUMENTO
                    </button>
                  </div>
                </div>
              )}

              {/* LISTA DE MATÉRIAS PADRÃO */}
              {CONFIG_ESCOLAS[escolaSelecionada].materias.map((materia) => {
                const mat = formatarNomeArquivo(materia);
                const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
                const cardImg = `${BASE_URL}/png/card_${mat}_${slug}.png`;

                return (
                  <div
                    key={materia}
                    className="rounded-3xl overflow-hidden bg-[#0f172a] border border-white/5 hover:border-orange-600 transition-all group shadow-xl hover:-translate-y-2"
                  >
                    <div className="h-56 bg-black p-6 flex items-center justify-center relative overflow-hidden">
                       <BookOpen size={80} className="text-white/[0.03] absolute -right-4 -bottom-4 rotate-12" />
                       <img 
                          src={cardImg} 
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 z-10"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=EM+BREVE"; }}
                       />
                    </div>

                    <div className="p-6">
                      <h3 className="font-black text-xs mb-4 text-orange-100 uppercase tracking-[0.2em] h-8 flex items-center">
                        {materia}
                      </h3>
                      <button
                        onClick={() => abrirPDF(materia)}
                        className="w-full bg-white/5 border border-white/10 hover:bg-orange-600 hover:text-black text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group"
                      >
                        <Download size={16} className="group-hover:animate-bounce" /> ACESSAR BIZÚ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      
      {/* RODAPÉ OPERACIONAL */}
      <footer className="mt-20 p-10 border-t border-white/5 text-center text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase">
        Foco, Força e Fé • Bizú Militar Fênix
      </footer>
    </div>
  );
}
