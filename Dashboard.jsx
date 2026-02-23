import React, { useState } from "react";
import { ChevronLeft, Download, Flame, BookOpen, FileText, ClipboardCheck, ScrollText } from "lucide-react";

/* ==============================
   CONFIGURAÇÃO CENTRAL - BIZU MILITAR FÊNIX
============================== */
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
    possuiManual: true // Ativa o card do Manual do Aluno
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
    slug: "eear",
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

  // Função para abrir documentos extras (Edital, Gabarito, etc)
  const abrirDocumentoExtra = (tipo) => {
    const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
    window.open(`${BASE_URL}/pdf/${tipo}_${slug}.pdf`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* HEADER */}
      <header className="bg-[#0f172a] border-b-4 border-orange-600 p-5 flex items-center gap-4">
        <Flame className="text-orange-500" />
        <h1 className="font-black italic text-xl tracking-tighter">BIZÚ MILITAR FÊNIX</h1>
      </header>

      <main className="p-10 max-w-7xl mx-auto">
        {/* MENU DE ESCOLAS */}
        {moduloAtivo === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(CONFIG_ESCOLAS).map(([nome, dados]) => (
              <button
                key={nome}
                onClick={() => {
                  setEscolaSelecionada(nome);
                  setModuloAtivo("apostilas");
                }}
                className="relative h-56 rounded-3xl overflow-hidden border-2 border-orange-600/30 hover:border-orange-600 hover:scale-[1.02] transition-all group"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `url(${BASE_URL}/jpg/${dados.banner}) center / cover no-repeat`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
                </div>

                <div className="relative z-10 h-full flex items-center justify-center p-4">
                  <h2 className="text-2xl font-black text-orange-400 text-center drop-shadow-lg">
                    {nome}
                  </h2>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* APOSTILAS */}
        {moduloAtivo === "apostilas" && (
          <>
            <button
              onClick={() => setModuloAtivo("menu")}
              className="mb-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition"
            >
              <ChevronLeft size={16} /> Voltar ao Menu
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-black border-l-4 border-orange-600 pl-4">
                {escolaSelecionada}
              </h2>
              
              {/* BOTÕES DE ACESSO RÁPIDO (EDITAL, PROVAS, GABARITOS) */}
              <div className="flex gap-2">
                <button onClick={() => abrirDocumentoExtra('edital')} className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition">
                  <ScrollText size={14}/> EDITAL
                </button>
                <button onClick={() => abrirDocumentoExtra('provas_anteriores')} className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition">
                  <FileText size={14}/> PROVAS
                </button>
                <button onClick={() => abrirDocumentoExtra('gabaritos')} className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition">
                  <ClipboardCheck size={14}/> GABARITOS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              
              {/* CARD ESPECIAL: MANUAL DO ALUNO (SÓ APARECE SE CONFIGURADO) */}
              {CONFIG_ESCOLAS[escolaSelecionada].possuiManual && (
                <div className="rounded-3xl overflow-hidden bg-[#0f172a] border-2 border-orange-500 shadow-2xl">
                  <div 
                    className="h-44 bg-center bg-cover"
                    style={{ backgroundImage: `url(${BASE_URL}/png/manual_${CONFIG_ESCOLAS[escolaSelecionada].slug}.png)` }}
                  ></div>
                  <div className="p-6">
                    <h3 className="font-black text-lg mb-4 text-orange-400 uppercase">MANUAL DO ALUNO</h3>
                    <button
                      onClick={() => window.open(`${BASE_URL}/pdf/manual_${CONFIG_ESCOLAS[escolaSelecionada].slug}.pdf`, "_blank")}
                      className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Download size={18} /> LER MANUAL
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
                    className="rounded-3xl overflow-hidden bg-[#0f172a] border border-white/5 hover:border-orange-600/50 transition-colors shadow-2xl"
                  >
                    <div
                      className="h-44 bg-center bg-cover flex items-center justify-center relative"
                      style={{ backgroundImage: `url(${cardImg})`, backgroundColor: '#1e293b' }}
                    >
                      <BookOpen size={48} className="text-white/10 absolute" />
                    </div>

                    <div className="p-6">
                      <h3 className="font-black text-lg mb-4 text-orange-100 uppercase tracking-tight">
                        {materia}
                      </h3>
                      <button
                        onClick={() => abrirPDF(materia)}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-orange-600/20"
                      >
                        <Download size={18} /> ACESSAR BIZÚ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
