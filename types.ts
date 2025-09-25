export interface WeaponCategory {
  name: string;
  type: 'Mischia' | 'Distanza';
  precision: number;
  damage: number;
  hits: number;
  threshold: number;
}

export interface ArmorCategory {
  name: string;
  physicalDamageReduction: number;
  magicalProtection: number;
  threshold: number;
  hits: number;
  baseWeight: number;
  penalty?: string;
}

export interface Material {
  name: string;
  precision: number;
  damage: number;
  hits: number;
  threshold: number;
  costMO: number;
  physicalDamageReduction?: number;
  magicalProtection?: number;
}

export interface Quality {
  name: string;
  distributablePoints: number;
  costMultiplier: number;
}

export interface CalculationResult {
  stats: {
    // Weapon stats
    precision?: number;
    damage?: number;
    // Shared
    hits: number;
    threshold: number;
    // Armor stats
    physicalDamageReduction?: number;
    magicalProtection?: number;
    baseWeight?: number;
  };
  distributablePoints: number;
  cost: string;
  penalty?: string;
}
