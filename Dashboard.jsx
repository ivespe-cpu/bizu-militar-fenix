import React, { useState } from "react";
import { ChevronLeft, Download, Flame, BookOpen } from "lucide-react";

/* ==============================
   CONFIGURAÇÃO CENTRAL
============================== */
const CONFIG_ESCOLAS = {
  "COLÉGIO NAVAL": {
    slug: "cn",
    banner: "cn.jpg",
    materias: [
      "MATEMÁTICA",
      "PORTUGUÊS",
      "INGLÊS",
      "HISTÓRIA",
      "GEOGRAFIA",
      "FÍSICA",
      "QUÍMICA",
      "BIOLOGIA",
    ],
  },
  "CMRJ – 6º ANO": {
    slug: "cmrj",
    banner: "cmrj.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"],
  },
  EPCAR: {
    slug: "epcar",
    banner: "epcar.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS"],
  },
  EsPCEX: {
    slug: "espcex",
    banner: "espcex.jpg",
    materias: [
      "MATEMÁTICA",
      "PORTUGUÊS",
      "INGLÊS",
      "HISTÓRIA",
      "GEOGRAFIA",
      "FÍSICA",
      "QUÍMICA",
    ],
  },
  EEAR: {
    slug: "eear",
    banner: "eear1.jpg",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "FÍSICA"],
  },
  ESA: {
    slug: "esa",
    banner: "esa.jpg",
    materias: [
      "MATEMÁTICA",
      "PORTUGUÊS",
      "INGLÊS",
      "HISTÓRIA",
      "GEOGRAFIA",
    ],
  },
};

const BASE_IMG = "jpg";
const BASE_PDF = "pdf";

export default function Dashboard() {
  const [moduloAtivo, setModuloAtivo] = useState("menu");
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);

  const abrirPDF = (materia) => {
    const mat = materia
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
    window.open(`/pdf/${mat}_${slug}.pdf`, "_blank");
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
            {Object.entries(CONFIG_ESCOLAS).map(([nome, dados]) => (
              <button
                key={nome}
                onClick={() => {
                  setEscolaSelecionada(nome);
                  setModuloAtivo("apostilas");
                }}
                className="relative h-56 rounded-3xl overflow-hidden border-2 border-orange-600 hover:scale-105 transition"
                style={{
                  backgroundImage: `url(${dados.banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* camada escura */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  <h2 className="text-xl font-black text-orange-400 text-center">
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
              className="mb-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"
            >
              <ChevronLeft size={16} /> Voltar
            </button>

            <h2 className="text-2xl font-black mb-6">{escolaSelecionada}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CONFIG_ESCOLAS[escolaSelecionada].materias.map((materia) => {
                const mat = materia
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");
                const slug = CONFIG_ESCOLAS[escolaSelecionada].slug;
                const cardImg = `/png/card_${mat}_${slug}.png`;

                return (
                  <div
                    key={materia}
                    className="rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10"
                  >
                    <div
                      className="h-40 bg-center bg-cover flex items-center justify-center"
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
