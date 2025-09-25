
import type { CalculationResult } from './types';
import { WEAPON_CATEGORIES, ARMOR_CATEGORIES, MATERIALS, NYRYL_MATERIAL, QUALITIES } from './data/gameData';

/**
 * Formats an integer with Italian locale-specific thousands separators.
 * @param num - The number to format.
 * @returns A formatted string representation of the number.
 */
const formatInteger = (num: number): string => {
  return new Intl.NumberFormat('it-IT').format(num);
};

/**
 * Formats a total cost in MO into a string with MAx and MO.
 * e.g., 10110 MO becomes "101 MAx e 10 MO".
 * @param costInMO - The total cost in the smallest currency unit (MO).
 * @returns A formatted cost string.
 */
export const formatCost = (costInMO: number): string => {
  if (costInMO < 0) {
    return 'Costo non valido';
  }
  
  const roundedCostInMO = Math.round(costInMO);
  const max = Math.floor(roundedCostInMO / 100);
  const mo = roundedCostInMO % 100;

  const maxPart = max > 0 ? `${formatInteger(max)} MAx` : '';
  const moPart = mo > 0 ? `${formatInteger(mo)} MO` : '';

  if (maxPart && moPart) {
    return `${maxPart} e ${moPart}`;
  }
  if (maxPart) {
    return maxPart;
  }
  if (moPart) {
    return moPart;
  }
  return '0 MO';
};


interface CalculationParams {
  calculatorType: 'weapon' | 'armor';
  categoryName: string;
  materialName: string;
  qualityName: string;
  useNyryl: boolean;
  weight: number;
}

/**
 * Calculates the final stats and cost of a weapon or armor based on user selections.
 * @param params - The parameters selected by the user.
 * @returns The calculated result, or null if inputs are invalid.
 */
export const calculateItemStats = (params: CalculationParams): CalculationResult | null => {
  const { calculatorType, categoryName, materialName, qualityName, useNyryl, weight } = params;

  const selectedMaterial = MATERIALS.find(m => m.name === materialName);
  const qualityIndex = QUALITIES.findIndex(q => q.name === qualityName);

  if (!categoryName || !selectedMaterial || qualityIndex === -1 || weight <= 0) {
    // Basic validation to ensure all required data is present.
    return null;
  }

  // --- CUMULATIVE QUALITY CALCULATION ---
  // Bonuses and costs from qualities are compounded.
  let cumulativePoints = 0;
  let cumulativeCostMultiplier = 1.0;

  // Iterate from the first quality ('Alta Qualità') up to the selected one.
  // 'Base' (index 0) is skipped, resulting in 0 points and 1.0 multiplier.
  for (let i = 1; i <= qualityIndex; i++) {
    const qualityTier = QUALITIES[i];
    cumulativePoints += qualityTier.distributablePoints;
    cumulativeCostMultiplier *= qualityTier.costMultiplier;
  }

  // --- COST CALCULATION ---
  // 1. Calculate base cost from the primary material and weight.
  let totalBaseCostInMO = selectedMaterial.costMO * weight;

  // 2. Add Nyryl cost if it's included.
  if (useNyryl) {
    totalBaseCostInMO += NYRYL_MATERIAL.costMO * weight;
  }

  // 3. Apply the cumulative quality's cost multiplier.
  const finalCostMO = totalBaseCostInMO * cumulativeCostMultiplier;

  // 4. Format the final cost.
  const finalCost = formatCost(finalCostMO);

  // The number of points to distribute is the cumulative total.
  const distributablePoints = cumulativePoints;


  // --- STATS CALCULATION ---
  if (calculatorType === 'weapon') {
    const selectedCategory = WEAPON_CATEGORIES.find(c => c.name === categoryName);
    if (!selectedCategory) return null;
    
    // Start with base stats from the weapon category.
    let finalStats: CalculationResult['stats'] = {
      precision: selectedCategory.precision,
      damage: selectedCategory.damage,
      hits: selectedCategory.hits,
      threshold: selectedCategory.threshold,
    };

    // Add stats from Nyryl if used.
    if (useNyryl) {
      finalStats.precision! += NYRYL_MATERIAL.precision;
      finalStats.damage! += NYRYL_MATERIAL.damage;
      finalStats.hits += NYRYL_MATERIAL.hits;
      finalStats.threshold += NYRYL_MATERIAL.threshold;
    }

    // Add stats from the main material.
    finalStats.precision! += selectedMaterial.precision;
    finalStats.damage! += selectedMaterial.damage;
    finalStats.hits += selectedMaterial.hits;
    finalStats.threshold += selectedMaterial.threshold;
    
    // Ranged weapons have special rules for hits and threshold.
    if (selectedCategory.type === 'Distanza') {
        finalStats.hits = selectedCategory.hits;
        finalStats.threshold = 0;
    }

    return {
      stats: finalStats,
      distributablePoints,
      cost: finalCost,
    };

  } else { // Armor calculation
    const selectedCategory = ARMOR_CATEGORIES.find(c => c.name === categoryName);
    if (!selectedCategory) return null;
    
    // Start with base stats from the armor category.
    let finalStats: CalculationResult['stats'] = {
        physicalDamageReduction: selectedCategory.physicalDamageReduction,
        magicalProtection: selectedCategory.magicalProtection,
        hits: selectedCategory.hits,
        threshold: selectedCategory.threshold,
        baseWeight: selectedCategory.baseWeight
    };

    // Add stats from Nyryl if used.
    if (useNyryl) {
        finalStats.physicalDamageReduction! += NYRYL_MATERIAL.physicalDamageReduction || 0;
        finalStats.magicalProtection! += NYRYL_MATERIAL.magicalProtection || 0;
        finalStats.hits += NYRYL_MATERIAL.hits;
        finalStats.threshold += NYRYL_MATERIAL.threshold;
    }

    // Add stats from the main material.
    finalStats.physicalDamageReduction! += selectedMaterial.physicalDamageReduction || 0;
    finalStats.magicalProtection! += selectedMaterial.magicalProtection || 0;
    finalStats.hits += selectedMaterial.hits;
    finalStats.threshold += selectedMaterial.threshold;

    return {
      stats: finalStats,
      distributablePoints,
      cost: finalCost,
      penalty: selectedCategory.penalty,
    };
  }
};
