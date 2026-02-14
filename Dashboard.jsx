import React, { useState } from 'react';
import { 
  Trophy, Flame, Target, Anchor, Sword, Shield, 
  Landmark, BookOpen, Video, FileText, ChevronLeft, 
  Download, Lock, Zap 
} from 'lucide-react';

export default function BizuMilitarFenix() {
  const [moduloAtivo, setModuloAtivo] = useState('menu');
  const aluno = { nome: 'RECRUTA', pontos: 450, ranking: '07º' };
  const apostilas = [
    { id: 1, materia: 'MATEMÁTICA', capa: 'https://i.ibb.co/MD42sWr9/capa-matematica.jpg' },
    { id: 2, materia: 'PORTUGUÊS', capa: 'https://i.ibb.co/tTJPWYsH/capa-portugues.jpg' },
    { id: 3, materia: 'INGLÊS', capa: 'https://i.ibb.co/rRGhQGv8/capa-ingles.jpg' },
    { id: 4, materia: 'HISTÓRIA', capa: 'https://i.ibb.co/3ykG6XN/capa-historia.jpg' },
    { id: 5, materia: 'GEOGRAFIA', capa: 'https://i.ibb.co/G4rdS7qT/capa-geografia.jpg' },
    { id: 6, materia: 'QUÍMICA', capa: 'https://i.ibb.co/gZ78ThkL/capa-quimica.jpg' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
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
          <div className="bg-black/40 border border-white/20 px-4 py-2 rounded-xl text-xs font-black text-green-400">{aluno.pontos} XP</div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {moduloAtivo === 'menu' ? (
          <div>
            <div className="mb-12 border-l-8 border-orange-600 pl-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tight">Centro de Comando</h2>
              <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest text-white">Selecione o módulo de combate abaixo</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <MenuCard label="APOSTILAS" icon={<BookOpen />} color="orange" onClick={() => setModuloAtivo('apostilas')} />
              <MenuCard label="VIDEOAULAS" icon={<Video />} color="red" />
              <MenuCard label="PROVAS" icon={<FileText />} color="blue" />
              <MenuCard label="SIMULADOS" icon={<Shield />} color="green" />
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => setModuloAtivo('menu')} className="flex items-center gap-2 bg-white/10 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-black text-xs transition-all mb-10 border border-white/10">
              <ChevronLeft size={16} /> VOLTAR AO QG
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {apostilas.map((ap) => (
                <div key={ap.id} className="bg-[#0f172a] rounded-[40px] border-2 border-white/5 overflow-hidden flex flex-col group hover:border-orange-500/50 transition-all">
                  <div className="h-64 w-full bg-black overflow-hidden relative border-b-4 border-orange-600">
                    <img src={ap.capa} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={ap.materia} />
                    <div className="absolute bottom-4 left-6 text-2xl font-black text-white italic tracking-tighter drop-shadow-lg">{ap.materia}</div>
                  </div>
                  <div className="p-6">
                    <button className="w-full bg-white text-black hover:bg-orange-600 hover:text-white py-4 rounded-2xl font-black text-xs uppercase transition-all flex items-center justify-center gap-2"><Download size={18} /> ACESSAR MATERIAL</button>
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

function MenuCard({ label, icon, onClick, color }) {
  const colors = { orange: 'border-orange-600 text-orange-500', red: 'border-red-600 text-red-500', blue: 'border-blue-600 text-blue-500', green: 'border-green-600 text-green-500' };
  return (
    <button onClick={onClick} className={`bg-[#0f172a] p-8 rounded-[35px] border-2 transition-all flex flex-col items-center gap-4 hover:-translate-y-2 ${colors[color]}`}>
      <div className="p-4 bg-black/40 rounded-2xl border border-white/5">{React.cloneElement(icon, { size: 32 })}</div>
      <span className="text-[10px] font-black tracking-widest text-white uppercase">{label}</span>
    </button>
  );
}
