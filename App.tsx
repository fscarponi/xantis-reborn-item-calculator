
import React, { useState, useEffect } from 'react';
import type { CalculationResult } from './types';
import { WEAPON_CATEGORIES, ARMOR_CATEGORIES, MATERIALS, QUALITIES } from './data/gameData';
import { calculateItemStats } from './utils';
import {
  ResultsDisplay,
  InputGroup,
  Select,
  NumberInput,
  ToggleButton,
  Disclaimer,
} from './components';

/**
 * The main application component.
 * It manages the user's selections and displays the calculator UI and results.
 */
const App: React.FC = () => {
  // State to track whether the user is calculating for a 'weapon' or 'armor'.
  const [calculatorType, setCalculatorType] = useState<'weapon' | 'armor'>('weapon');

  // State for all the form inputs.
  const [category, setCategory] = useState<string>(WEAPON_CATEGORIES[0].name);
  const [material, setMaterial] = useState<string>(MATERIALS[0].name);
  const [quality, setQuality] = useState<string>(QUALITIES[0].name);
  const [useNyryl, setUseNyryl] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(1);

  // State to hold the final calculation result.
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Determine which categories to show based on the calculator type.
  const categories = calculatorType === 'weapon' ? WEAPON_CATEGORIES : ARMOR_CATEGORIES;

  /**
   * Effect hook to reset the category selection and results
   * whenever the calculator type (weapon/armor) changes.
   */
  useEffect(() => {
    // Set the default category to the first one in the new list.
    if (categories.length > 0) {
        setCategory(categories[0].name);
    }
    // Clear previous results.
    setResult(null);
  }, [calculatorType, categories]);

  /**
   * Effect hook to automatically update the weight multiplier
   * based on the selected item category.
   */
  useEffect(() => {
    let defaultWeight: number;

    if (calculatorType === 'weapon') {
        switch (category) {
            case 'Armi Leggere':
            case 'Armi a Distanza Precise':
                defaultWeight = 3;
                break;
            case 'Armi Bilanciate':
            case 'Armi a Distanza Bilanciate':
                defaultWeight = 5;
                break;
            case 'Armi Pesanti':
            case 'Armi a Distanza Pesanti':
                defaultWeight = 8;
                break;
            default:
                defaultWeight = 1;
        }
    } else { // calculatorType === 'armor'
        switch (category) {
            case 'Armature Leggere':
                defaultWeight = 3;
                break;
            case 'Armature Medie':
                defaultWeight = 6;
                break;
            case 'Armature Pesanti':
                defaultWeight = 8;
                break;
            default:
                defaultWeight = 1;
        }
    }
    setWeight(defaultWeight);
  }, [category, calculatorType]);


  /**
   * Handles the calculation logic when the user clicks the "Calculate" button.
   */
  const handleCalculate = () => {
    // Gathers all state into a parameters object.
    const params = {
      calculatorType,
      categoryName: category,
      materialName: material,
      qualityName: quality,
      useNyryl,
      weight
    };

    // Calls the dedicated calculation function.
    const calculationResult = calculateItemStats(params);
    
    // Updates the state with the new result.
    if (calculationResult) {
      setResult(calculationResult);
    } else {
      // If the calculation returns null (due to invalid input), alert the user.
      alert("Per favore, compila tutti i campi correttamente.");
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
            GDR Item Calculator
          </h1>
          <p className="text-slate-400 mt-2">Crea e calcola le statistiche dei tuoi oggetti personalizzati.</p>
        </header>

        <Disclaimer />

        <main className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8">
          {/* Toggle buttons to switch between Weapon and Armor calculators */}
          <div className="flex justify-center mb-6 bg-slate-700/50 p-1 rounded-lg w-full max-w-xs mx-auto">
              <ToggleButton active={calculatorType === 'weapon'} onClick={() => setCalculatorType('weapon')}>Armi</ToggleButton>
              <ToggleButton active={calculatorType === 'armor'} onClick={() => setCalculatorType('armor')}>Armature</ToggleButton>
          </div>

          {/* Form inputs for item properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InputGroup label={`Categoria ${calculatorType === 'weapon' ? 'Arma' : 'Armatura'}`}>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </Select>
            </InputGroup>
            
            <InputGroup label="Materiale Principale">
              <Select value={material} onChange={(e) => setMaterial(e.target.value)}>
                {MATERIALS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
              </Select>
            </InputGroup>

            <InputGroup label="Qualità">
              <Select value={quality} onChange={(e) => setQuality(e.target.value)}>
                {QUALITIES.map(q => <option key={q.name} value={q.name}>{q.name}</option>)}
              </Select>
            </InputGroup>

            <InputGroup label="Moltiplicatore Peso/Dimensione">
                <NumberInput value={weight} onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
            </InputGroup>
          </div>

          {/* Toggle for including Nyryl material */}
          <div className="flex items-center justify-center mb-8">
            <label htmlFor="nyryl-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="nyryl-toggle" className="sr-only" checked={useNyryl} onChange={() => setUseNyryl(!useNyryl)} />
                <div className="block bg-slate-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform duration-300 ease-in-out"></div>
              </div>
              <div className="ml-3 text-slate-300 font-medium">
                Contiene Nyryl?
              </div>
            </label>
            <style>{`
              #nyryl-toggle:checked ~ .dot {
                transform: translateX(100%);
                background-color: #6366f1; /* indigo-500 */
              }
            `}</style>
          </div>
          
          {/* Calculate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCalculate}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Calcola Statistiche e Costo
            </button>
          </div>
        </main>
        
        {/* Render results if available */}
        {result && <ResultsDisplay result={result} />}
      </div>

      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>Applicazione creata per il calcolo di oggetti GDR.</p>
      </footer>
    </div>
  );
};

export default App;
