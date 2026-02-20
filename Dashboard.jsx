import React, { useState } from "react";
import {
  Flame,
  Anchor,
  Landmark,
  Zap,
  BookOpen,
  ChevronLeft,
  Download
} from "lucide-react";

// ==========================================
// ARSENAL DE CONFIGURAÇÃO (ESCOLAS)
// ==========================================
const CONFIG_ESCOLAS = {
  "COLÉGIO NAVAL": {
    slug: "colegio_naval",
    materias: [
      "MATEMÁTICA",
      "PORTUGUÊS",
      "INGLÊS",
      "HISTÓRIA",
      "GEOGRAFIA",
      "FÍSICA",
      "QUÍMICA",
      "BIOLOGIA"
    ]
  },
  "CMRJ": {
    slug: "cmrj",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"]
  },
  "EPCAR": {
    slug: "epcar",
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS"]
  }
};

export default function BizuMilitarFenix() {
  // ===============================
  // ESTADOS (CÉREBRO DO SISTEMA)
  // ===============================
  const [moduloAtivo, setModuloAtivo] = useState("menu");
  const [escolaSelecionada, setEscolaSelecionada] = useState("COLÉGIO NAVAL");

  const aluno = { nome: "RECRUTA", pontos: 450 };

  // ===============================
  // ABRIR MATERIAL (PDF)
  // ===============================
  const handleAcessarMaterial = (materia) => {
    const materiaClean = materia
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const escolaClean = CONFIG_ESCOLAS[escolaSelecionada].slug;

    const url = `https://raw.githubusercontent.com/ivespe-cpu/bizu-militar-fenix/main/pdf/${materiaClean}_${escolaClean}.pdf`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0f172a] border-b-4 border-orange-600 p-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-2xl animate-pulse">
              <Flame size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black italic">
                BIZÚ MILITAR <span className="text-orange-500">FÊNIX</span>
              </h1>
              <p className="text-xs text-orange-400 font-bold tracking-widest">
                CENTRO DE COMANDO
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-black/40 px-4 py-2 rounded-xl text-xs font-black text-orange-400">
              {escolaSelecionada}
            </div>
            <div className="bg-black/40 px-4 py-2 rounded-xl text-xs font-black text-green-400">
              {aluno.pontos} XP
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        {/* ================= MENU DE ESCOLAS ================= */}
        {moduloAtivo === "menu" && (
          <>
            <div className="mb-12 border-l-8 border-orange-600 pl-6">
              <h2 className="text-5xl font-black italic">
                Centro de Comando
              </h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                Selecione sua frente de batalha
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MenuCard
                label="COLÉGIO NAVAL"
                icon={<Anchor />}
                color="orange"
                onClick={() => {
                  setEscolaSelecionada("COLÉGIO NAVAL");
                  setModuloAtivo("apostilas");
                }}
              />

              <MenuCard
                label="CMRJ - 6º ANO"
                icon={<Landmark />}
                color="green"
                onClick={() => {
                  setEscolaSelecionada("CMRJ");
                  setModuloAtivo("apostilas");
                }}
              />

              <MenuCard
                label="EPCAR"
                icon={<Zap />}
                color="blue"
                onClick={() => {
                  setEscolaSelecionada("EPCAR");
                  setModuloAtivo("apostilas");
                }}
              />
            </div>
          </>
        )}

        {/* ================= APOSTILAS ================= */}
        {moduloAtivo === "apostilas" && (
          <>
            <div className="flex justify-between items-center mb-10">
              <button
                onClick={() => setModuloAtivo("menu")}
                className="flex items-center gap-2 bg-white/10 hover:bg-orange-600 px-6 py-3 rounded-full text-xs font-black"
              >
                <ChevronLeft size={16} /> VOLTAR
              </button>

              <h2 className="text-2xl font-black italic text-orange-500">
                Apostilas — {escolaSelecionada}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {CONFIG_ESCOLAS[escolaSelecionada].materias.map((materia) => (
                <div
                  key={materia}
                  className="bg-[#0f172a] rounded-[35px] border border-white/10 overflow-hidden"
                >
                  <div className="h-44 bg-slate-900 flex flex-col items-center justify-center border-b-4 border-orange-600">
                    <BookOpen size={48} className="text-orange-500/40" />
                    <span className="mt-2 text-xl font-black italic">
                      {materia}
                    </span>
                  </div>

                  <div className="p-6">
                    <button
                      onClick={() => handleAcessarMaterial(materia)}
                      className="w-full bg-white text-black hover:bg-orange-600 hover:text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2"
                    >
                      <Download size={18} /> ACESSAR MATERIAL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ==========================================
// COMPONENTE: CARTÃO DE MENU
// ==========================================
function MenuCard({ label, icon, onClick, color }) {
  const colors = {
    orange: "border-orange-600 text-orange-500",
    green: "border-green-600 text-green-500",
    blue: "border-blue-600 text-blue-500"
  };

  return (
    <button
      onClick={onClick}
      className={`bg-[#0f172a] p-8 rounded-[35px] border-2 ${colors[color]} transition hover:-translate-y-2 flex flex-col items-center gap-4`}
    >
      <div className="p-4 bg-black/40 rounded-2xl">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <span className="text-xs font-black tracking-widest uppercase">
        {label}
      </span>
    </button>
  );
}
