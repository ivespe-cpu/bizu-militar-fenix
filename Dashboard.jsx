import React, { useState } from 'react';
import { 
  Trophy, Flame, Target, Anchor, Sword, Shield, 
  Landmark, BookOpen, Video, FileText, ChevronLeft, 
  Download, Lock, Zap, GraduationCap 
} from 'lucide-react';

// ==========================================
// CÓD. 1 - ARSENAL DE CONFIGURAÇÃO (O MANUAL)
// ==========================================
const CONFIG_ESCOLAS = {
  "COLÉGIO NAVAL": {
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS", "HISTÓRIA", "GEOGRAFIA", "FÍSICA", "QUÍMICA", "BIOLOGIA"],
    cor: "border-orange-600",
    slug: "colegio_naval"
  },
  "CMRJ": {
    materias: ["MATEMÁTICA", "PORTUGUÊS", "REDAÇÃO"],
    cor: "border-green-600",
    slug: "cmrj"
  },
  "EPCAR": {
    materias: ["MATEMÁTICA", "PORTUGUÊS", "INGLÊS"],
    cor: "border-blue-600",
    slug: "epcar"
  }
};

export default function BizuMilitarFenix() {
  // ESTADOS (Cérebro do Componente)
  const [moduloAtivo, setModuloAtivo] = useState('menu');
  const [escolaSelecionada, setEscolaSelecionada] = useState("COLÉGIO NAVAL");
  
  const aluno = { nome: 'RECRUTA', pontos: 450, ranking: '07º' };

  // ==========================================
  // CÓD. 3 - FUNÇÃO DE DISPARO (ABRIR PDF)
  // ==========================================
  const handleAcessarMaterial = (materia) => {
    // Limpa o nome da matéria (tira acentos e coloca minúsculo)
    const matClean = materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const escolaClean = CONFIG_ESCOLAS[escolaSelecionada].slug;
    
    // URL do seu GitHub (Pasta PDF)
    const urlGithub = `https://raw.githubusercontent.com/ivespe-cpu/bizu-militar-fenix/main/pdf/${matClean}_${escolaClean}.pdf`;
    
    window.open(urlGithub, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* HEADER TÁTICO */}
      <header className="sticky top-0 z-50 bg-[#0f172a] border-b-4 border-orange-600 p-5 shadow-[0_4px_30px_rgba(234,88,12,0.3)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-[0_0_20px_rgba(234,88,12,0.6)] animate-pulse">
              <Flame size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">
                BIZÚ MILITAR <span className="text-orange-500">FÊNIX</span>
              </h1>
              <p className="text-[10px] md:text-xs text-orange-400 font-bold tracking-[0.4em] uppercase">Setor de Operações de Elite</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="hidden md:block bg-black/40 border border-white/20 px-4 py-2 rounded-xl text-xs font-black text-orange-400">ESCOLA: {escolaSelecionada}</div>
            <div className="bg-black/40 border border-white/20 px-4 py-2 rounded-xl text-xs font-black text-green-400">{aluno.pontos} XP</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        
        {/* TELA 1: MENU DE ESCOLAS (NOVIDADE) */}
        {moduloAtivo === 'menu' ? (
          <div>
            <div className="mb-12 border-l-8 border-orange-600 pl-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tight">Centro de Comando</h2>
              <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Selecione sua frente de batalha</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               {/* Botões das Escolas - Ao clicar, define a escola e abre as apostilas */}
               <MenuCard label="COLÉGIO NAVAL" icon={<Anchor />} color="orange" onClick={() => { setEscolaSelecionada("COLÉGIO NAVAL"); setModuloAtivo('apostilas'); }} />
               <MenuCard label="CMRJ - 6º ANO" icon={<Landmark />} color="green" onClick={() => { setEscolaSelecionada("CMRJ"); setModuloAtivo('apostilas'); }} />
               <MenuCard label="EPCAR" icon={<Zap />} color="blue" onClick={() => { setEscolaSelecionada("EPCAR"); setModuloAtivo('apostilas'); }} />
            </div>
          </div>

        /* TELA 2: CENTRAL DE INTELIGÊNCIA (DINÂMICA) */
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <button onClick={() => setModuloAtivo('menu')} className="flex items-center gap-2 bg-white/10 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-black text-xs transition-all border border-white/10">
                  <ChevronLeft size={16} /> VOLTAR AO QG
                </button>
                <h2 className="text-2xl font-black text-orange-500 uppercase italic">Apostilas: {escolaSelecionada}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* O MAPA DO TESOURO: Só mostra as matérias da escola escolhida */}
              {CONFIG_ESCOLAS[escolaSelecionada].materias.map((materia, index) => (
                <div key={index} className="group relative bg-[#0f172a] rounded-[40px] border-2 border-white/5 overflow-hidden flex flex-col hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.2)] transition-all duration-300">
                  <div className="h-48 w-full bg-slate-900 flex items-center justify-center relative border-b-4 border-orange-600">
                    <BookOpen size={60} className="text-orange-600/20 absolute group-hover:scale-150 transition-transform" />
                    <div className="relative z-10 text-center p-4">
                        <span className="text-3xl font-black text-white italic tracking-tighter drop-shadow-lg">{materia}</span>
                        <div className="text-[10px] text-orange-400 font-bold mt-2">MISSÃO FÊNIX</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <button 
                      onClick={() => handleAcessarMaterial(materia)}
                      className="w-full bg-white text-black hover:bg-orange-600 hover:text-white py-4 rounded-2xl font-black text-xs uppercase transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Download size={18} /> ACESSAR MATERIAL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// COMPONENTE DE CARTÃO DO MENU (REUTILIZÁVEL)
function MenuCard({ label, icon, onClick, color }) {
  const colors = { 
    orange: 'border-orange-600 text-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]', 
    red: 'border-red-600 text-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]', 
    blue: 'border-blue-600 text-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]', 
    green: 'border-green-600 text-green-500 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)]' 
  };
  
  return (
    <button onClick={onClick} className={`bg-[#0f172a] p-8 rounded-[35px] border-2 transition-all flex flex-col items-center gap-4 hover:-translate-y-2 ${colors[color]}`}>
      <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <span className="text-[10px] font-black tracking-widest text-white uppercase">{label}</span>
    </button>
  );
}
