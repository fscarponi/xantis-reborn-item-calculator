
import React from 'react';
import type { CalculationResult } from './types';

/**
 * Displays a single statistic with a label, value, and an icon.
 */
export const StatDisplay: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg shadow-md text-center">
    <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-slate-800 text-indigo-400">
      {icon}
    </div>
    <span className="text-sm font-medium text-slate-400">{label}</span>
    <span className="text-2xl font-bold text-slate-100">{value}</span>
  </div>
);

/**
 * Displays the full set of calculated results, including stats, costs, and any penalties.
 */
export const ResultsDisplay: React.FC<{ result: CalculationResult }> = ({ result }) => (
  <div className="w-full max-w-4xl p-6 mt-8 bg-slate-800 rounded-xl shadow-2xl">
    <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Risultati del Calcolo</h2>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-300">Statistiche Finali</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Weapon-specific stats */}
        {result.stats.precision !== undefined && <StatDisplay label="Precisione" value={result.stats.precision} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} />}
        {result.stats.damage !== undefined && <StatDisplay label="Danno" value={result.stats.damage} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />}
        
        {/* Armor-specific stats */}
        {result.stats.physicalDamageReduction !== undefined && <StatDisplay label="Rid. Danno Fisico" value={result.stats.physicalDamageReduction} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>} />}
        {result.stats.magicalProtection !== undefined && <StatDisplay label="Prot. Magica" value={result.stats.magicalProtection} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} />}
        
        {/* Shared stats */}
        <StatDisplay label="Colpi" value={result.stats.hits} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
        <StatDisplay label="Soglia" value={result.stats.threshold} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} />
        {result.stats.baseWeight !== undefined && <StatDisplay label="Peso" value={result.stats.baseWeight} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" /></svg>} />}
      </div>
    </div>
    
    {/* Display penalty if it exists */}
    {result.penalty && (
      <div className="mt-6 p-4 bg-red-900/50 border border-red-700/50 rounded-lg text-center">
        <h3 className="font-semibold text-red-300">Note Speciali / Penalità</h3>
        <p className="text-red-400">{result.penalty}</p>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
        <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-semibold text-slate-400">Punti Qualità da Distribuire</h3>
            <p className="text-4xl font-bold text-green-400">{result.distributablePoints}</p>
        </div>
        <div className="p-4 bg-slate-700/50 rounded-lg md:col-span-2">
            <h3 className="font-semibold text-slate-400">Costo Totale</h3>
            <p className="text-4xl font-bold text-yellow-400">{result.cost}</p>
        </div>
    </div>
  </div>
);

/**
 * A wrapper for a form input field that includes a label.
 */
export const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-400">{label}</label>
    {children}
  </div>
);

/**
 * A styled <select> component for dropdown menus.
 */
export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select {...props} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" />
);

/**
 * A styled <input type="number"> component.
 */
export const NumberInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
   <input {...props} type="number" className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" />
);

/**
 * A button used in a toggle group, e.g., for switching between Weapon/Armor calculators.
 */
export const ToggleButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode}> = ({ active, onClick, children }) => (
  <button
      onClick={onClick}
      className={`w-full py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 focus:outline-none ${
          active ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-300 hover:bg-slate-600/50'
      }`}
  >
      {children}
  </button>
);
