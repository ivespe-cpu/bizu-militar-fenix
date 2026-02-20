import React, { useState } from 'react';
import { Anchor, Landmark, Zap, ChevronLeft, Download, Flame, BookOpen } from 'lucide-react';
/* ==============================
   CONFIGURAÇÃO CENTRAL
============================== */
const CONFIG_ESCOLAS = {
  "COLÉGIO NAVAL": {
    slug: "cn",
    banner: "cn.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA", "BIOLOGIA"]
  },
  "CMRJ": {
    slug: "cmrj",
    banner: "cmrj.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"]
  },
  "EPCAR": {
    slug: "epcar",
    banner: "epcar.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS"]
  }
};

const BASE_IMG = "https://raw.githubusercontent.com/ivespe-cpu/bizu-militar-fenix/main/img";
const BASE_PDF = "https://raw.githubusercontent.com/ivespe-cpu/bizu-militar-fenix/main/pdf";

export default function Dashboard() {
  const [moduloAtivo, setModuloAtivo] = useState("menu");
  const [escolaSelecionada, setEscolaSelecionada] = useState("COLÉGIO NAVAL");

  const abrirPDF = (materia) => {
    const mat = materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
    window.open(`${BASE_PDF}/${mat}_${slug}.pdf`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* HEADER */}
      <header className="bg-[#0f172a] border-b-4 border-orange-600 p-5 flex items-center gap-4">
        <Flame className="text-orange-500" />
        <h1 className="font-black italic text-xl">BIZÚ MILITAR FÊNIX</h1>
      </header>

      <main className="p-10 max-w-7xl mx-auto">

        {/* MENU DE ESCOLAS */}
        {moduloAtivo === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(CONFIG_ESCOLAS).map((escola) => (
              <MenuCard
                key={escola}
                label={escola}
                image={`${BASE_IMG}/${CONFIG_ESCOLAS[escola].banner}`}
                onClick={() => {
                  setEscolaSelecionada(escola);
                  setModuloAtivo("apostilas");
                }}
              />
            ))}
          </div>
        )}

        {/* APOSTILAS */}
        {moduloAtivo === "apostilas" && (
          <>
            <button
              onClick={() => setModuloAtivo("menu")}
              className="mb-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"
            >
              <ChevronLeft size={16} /> Voltar
            </button>

            <h2 className="text-2xl font-black mb-6">{escolaSelecionada}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

               <div className="cards-grid">

  {/* COLÉGIO NAVAL */}
  <div className="card" onClick={() => setPdfAtivo("/pdf/manual_cn.pdf")}>
    <img src="/png/card_portugues.cn.png" alt="Colégio Naval" />
    <h3>Colégio Naval</h3>
  </div>

  {/* EPCAR */}
  <div className="card" onClick={() => setPdfAtivo("/pdf/manual_epcar.pdf")}>
    <img src="/png/card_matematica_epcar.png" alt="EPCAR" />
    <h3>EPCAR</h3>
  </div>

  {/* CMRJ */}
  <div className="card" onClick={() => setPdfAtivo("/pdf/manual_cmrj.pdf")}>
    <img src="/png/card_matematica_cmrj.png" alt="CMRJ" />
    <h3>CMRJ – 6º Ano</h3>
  </div>

             
</div>
              {CONFIG_ESCOLAS[escolaSelecionada].materias.map((materia) => {
                const mat = materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
                const cardImg = `${BASE_IMG}/card_${mat}_${slug}.png`;

                return (
                  <div
                    key={materia}
                    className="rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10"
                  >
                    <div
                      className="h-48 bg-center bg-cover flex items-center justify-center"
                      style={{ backgroundImage: `url(${cardImg})` }}
                    >
                      <BookOpen size={48} className="text-white/30" />
                    </div>

                    <div className="p-5">
                      <h3 className="font-black mb-4">{materia}</h3>
                      <button
                        onClick={() => abrirPDF(materia)}
                        className="w-full bg-orange-600 text-black font-black py-3 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Download size={16} /> Estudar PDF
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

/* ==============================
   CARD DE ESCOLA
function MenuCard({ label, icon, onClick, color }) {
  const colors = { 
    orange: 'border-orange-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    yellow: 'border-yellow-600'
  };

  // 🔥 IMAGENS DE FUNDO DOS BOTÕES
  const backgroundImages = {
    "COLÉGIO NAVAL": "/cn.jpg",
    "CMRJ": "/cmrj.jpg",
        "CMRJ - 6º ANO": "/cmrj.jpg",
    "EPCAR": "/epcar.jpg",
    "ESPÇEX": "/espcex.jpg",
    "EEAR": "/eear.jpg",
    "ESA": "/esa.jpg"
  };

  return (
    <button
      onClick={onClick}
      className={`relative p-8 rounded-[35px] border-2 transition-all flex flex-col items-center justify-center gap-4 hover:-translate-y-2 overflow-hidden ${colors[color]}`}
      style={{
        backgroundImage: `url(${backgroundImages[label]})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* CAMADA ESCURA PARA DAR CONTRASTE */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-4 bg-black/40 rounded-2xl border border-white/10">
        {React.cloneElement(icon, { size: 32 })}
      </div>

      <span className="relative z-10 text-sm font-black tracking-widest text-yellow-400 uppercase text-center">
        {label}
      </span>
    </button>
  );
}
{pdfAtivo && (
  <div className="pdf-overlay">
    <button onClick={() => setPdfAtivo(null)}>Fechar</button>
    <iframe
      src={pdfAtivo}
      width="100%"
      height="100%"
      title="PDF"
    />
  </div>
)}
