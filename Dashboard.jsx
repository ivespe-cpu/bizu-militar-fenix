import React, { useState } from "react";
import { ChevronLeft, Download, BookOpen, LogOut } from "lucide-react";

/* ==============================
   CONFIGURAÇÃO CENTRAL
============================== */
const BASE_URL = "https://ivespe-cpu.github.io/bizu-militar-fenix";

const CONFIG_ESCOLAS = {
  "COLÉGIO NAVAL": {
    slug: "cn",
    banner: "cn.jpg", // Apenas o nome do arquivo aqui
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA", "BIOLOGIA"],
  },
  "CMRJ – 6º ANO": {
    slug: "cmrj",
    banner: "cmrj.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"],
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

export default function Dashboard({ user, onLogout }) {
  const [moduloAtivo, setModuloAtivo] = useState("menu");
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);

  const abrirPDF = (materia) => {
    const mat = materia
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
    
    const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
    // URL formatada corretamente para o GitHub Pages
    window.open(`${BASE_URL}/pdf/${mat}_${slug}.pdf`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      
      {/* HEADER UNIFICADO (MEDALHA ANIMADA) */}
      <header className="bg-[#0f172a] border-b-4 border-orange-600 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <video 
            className="h-[60px] w-[60px] rounded-full border-2 border-yellow-500 object-cover shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
            autoPlay loop muted playsInline
          >
            <source src={`${BASE_URL}/video/logo_esquadrao.mp4`} type="video/mp4" />
          </video>
          <div>
            <h1 className="font-black italic text-lg text-orange-500 leading-none">BIZÚ MILITAR</h1>
            <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Esquadrão Fênix</p>
          </div>
        </div>

        <div className="hidden md:block text-center">
          <span className="text-[#D4AF37] font-black italic text-sm animate-pulse">
             QG: {user?.p || "GUERREIRO"}
          </span>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 font-bold border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs"
        >
          <LogOut size={14} /> SAIR
        </button>
      </header>

      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        
        {/* MENU PRINCIPAL DE ESCOLAS */}
        {moduloAtivo === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(CONFIG_ESCOLAS).map(([nome, dados]) => (
              <button
                key={nome}
                onClick={() => {
                  setEscolaSelecionada(nome);
                  setModuloAtivo("apostilas");
                }}
                className="group relative h-60 rounded-[2rem] overflow-hidden border-2 border-white/5 hover:border-orange-600 transition-all duration-500 shadow-2xl"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `url(${BASE_URL}/jpg/${dados.banner}) center / cover no-repeat`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <h2 className="text-2xl font-black text-white group-hover:text-orange-500 transition-colors">
                    {nome}
                  </h2>
                  <div className="w-10 h-1 bg-orange-600 mt-2 transition-all group-hover:w-full"></div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ÁREA DE MATERIAIS / APOSTILAS */}
        {moduloAtivo === "apostilas" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setModuloAtivo("menu")}
              className="mb-8 flex items-center gap-2 bg-white/5 hover:bg-orange-600 hover:text-black px-6 py-2 rounded-full transition-all font-bold text-sm border border-white/10"
            >
              <ChevronLeft size={18} /> VOLTAR AO QG
            </button>

            <div className="flex items-center gap-4 mb-10 border-l-4 border-orange-600 pl-4">
               <h2 className="text-3xl font-black italic uppercase">{escolaSelecionada}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONFIG_ESCOLAS[escolaSelecionada].materias.map((materia) => {
                const matFormatado = materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_");
                const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
                
                return (
                  <div key={materia} className="group bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-orange-600/50 transition-all">
                    <div className="h-48 bg-black relative flex items-center justify-center overflow-hidden p-4">
                      <img 
                        src={`${BASE_URL}/png/card_${matFormatado}_${slug}.png`}
                        alt={materia}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=MATERIAL+EM+BREVE"; }}
                      />
                    </div>

                    <div className="p-5 bg-gradient-to-b from-[#0f172a] to-black">
                      <h3 className="font-bold text-xs mb-4 text-orange-100 uppercase tracking-tighter h-8 flex items-center">
                        {materia}
                      </h3>
                      <button
                        onClick={() => abrirPDF(materia)}
                        className="w-full bg-orange-600 hover:bg-white text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs"
                      >
                        <Download size={14} /> ACESSAR APOSTILA
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
