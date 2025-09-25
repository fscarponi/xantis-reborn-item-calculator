
import type { WeaponCategory, Material, Quality, ArmorCategory } from '../types';

export const WEAPON_CATEGORIES: WeaponCategory[] = [
  { name: 'Armi Leggere', type: 'Mischia', precision: 2, damage: 1, hits: 1, threshold: 1 },
  { name: 'Armi Bilanciate', type: 'Mischia', precision: 1, damage: 2, hits: 2, threshold: 1 },
  { name: 'Armi Pesanti', type: 'Mischia', precision: 0, damage: 4, hits: 3, threshold: 4 },
  { name: 'Armi a Distanza Precise', type: 'Distanza', precision: 2, damage: 1, hits: 1, threshold: 0 },
  { name: 'Armi a Distanza Bilanciate', type: 'Distanza', precision: 1, damage: 2, hits: 1, threshold: 0 },
  { name: 'Armi a Distanza Pesanti', type: 'Distanza', precision: 0, damage: 6, hits: 1, threshold: 0 },
];

export const ARMOR_CATEGORIES: ArmorCategory[] = [
    { name: 'Armature Leggere', physicalDamageReduction: 2, magicalProtection: 2, threshold: 4, hits: 1, baseWeight: 2 },
    { name: 'Armature Medie', physicalDamageReduction: 4, magicalProtection: 4, threshold: 6, hits: 2, baseWeight: 4 },
    { name: 'Armature Pesanti', physicalDamageReduction: 6, magicalProtection: 6, threshold: 8, hits: 4, baseWeight: 8, penalty: 'Penalità di 1 taglia dado sulle prove di Destrezza e Prontezza.' },
];

export const MATERIALS: Material[] = [
  { name: 'Legno', precision: 1, damage: 0, hits: 0, threshold: 0, costMO: 1 },
  { name: 'Cuoio', precision: 0, damage: 0, hits: 0, threshold: 0, costMO: 1 },
  { name: 'Ferro', precision: 1, damage: 3, hits: 1, threshold: 5, costMO: 1 },
  { name: 'Bronzo', precision: 2, damage: 2, hits: 1, threshold: 5, costMO: 1 },
  { name: 'Acciaio', precision: 5, damage: 5, hits: 2, threshold: 9, costMO: 100 },
  { name: 'Xama', precision: 4, damage: 3, hits: 3, threshold: 5, costMO: 150 },
  { name: 'Settimo Metallo', precision: 7, damage: 5, hits: 4, threshold: 9, costMO: 1000 },
  { name: 'Cristallo Nero', precision: 9, damage: 7, hits: 5, threshold: 10, costMO: 10000 },
  { name: 'Portal', precision: 9, damage: 10, hits: 8, threshold: 11, costMO: 150000000 },
  { name: 'Mithril', precision: 11, damage: 8, hits: 7, threshold: 10, costMO: 300000000 },
  { name: 'Scaglie di Drago', precision: 12, damage: 12, hits: 10, threshold: 12, costMO: 2000000000 },
  { name: 'Legno di Quercia', precision: 7, damage: 3, hits: 5, threshold: 6, costMO: 2000000000 },
];

export const NYRYL_MATERIAL: Material = {
  name: 'Nyryl',
  precision: 3,
  damage: 3,
  hits: 3,
  threshold: 3,
  physicalDamageReduction: 3,
  magicalProtection: 3,
  costMO: 100000000,
};

export const QUALITIES: Quality[] = [
  { name: 'Base', distributablePoints: 0, costMultiplier: 1.0 },
  { name: 'Alta Qualità', distributablePoints: 2, costMultiplier: 1.5 },
  { name: 'Qualità Estrema', distributablePoints: 3, costMultiplier: 2.0 },
  { name: 'Qualità Leggendaria Grado 1', distributablePoints: 4, costMultiplier: 3.0 },
  { name: 'Qualità Leggendaria Grado 2', distributablePoints: 4, costMultiplier: 5.0 },
  { name: 'Qualità Divina Grado 1', distributablePoints: 5, costMultiplier: 5.0 },
  { name: 'Qualità Divina Grado 2', distributablePoints: 5, costMultiplier: 5.0 },
  { name: 'Qualità Divina Grado 3', distributablePoints: 5, costMultiplier: 5.0 },
  { name: 'Qualità Divina Grado 4', distributablePoints: 5, costMultiplier: 5.0 },
  { name: 'Qualità Divina Grado 5', distributablePoints: 5, costMultiplier: 5.0 },
  { name: 'Enambre', distributablePoints: 20, costMultiplier: 20.0 },
  { name: 'Enambre Grado 2', distributablePoints: 20, costMultiplier: 20.0 },
  { name: 'Enambre Grado 3', distributablePoints: 20, costMultiplier: 20.0 },
  { name: 'Enambre Grado 4', distributablePoints: 20, costMultiplier: 20.0 },
  { name: 'Enambre Grado 5', distributablePoints: 20, costMultiplier: 20.0 },
  { name: '???', distributablePoints: 50, costMultiplier: 50.0 },
];
