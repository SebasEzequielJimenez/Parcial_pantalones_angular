export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type Cut = 'Recto' | 'Slim' | 'Oxford' | 'Skinny' | 'Cargo' | 'Jogger';

export interface Trouser {
  id?: string;
  modelName: string;
  salePrice: number;
  isInStore: boolean;
  size: Size;
  cut: Cut;
  notes?: string;
}