export interface IItem {
  id: string;
  label: string;
  quantity: number;
  price: number;
  sex: Sex;
  size: TShirtSize | ShoeSize;
}
export class Item implements IItem {
  constructor(
    public id: string,
    public label: string,
    public quantity: number,
    public price: number,
    public sex: Sex,
    public size: TShirtSize | ShoeSize,
  ) { }
}

export interface IDatabaseItem {
  id: string;
  label: string;
  price: number;
  sale: number;
  sex: Sex;
  picture: string;
  availableSizes: ITShirtSize[] | IShoeSize[];
  description: string;
  attributes?: string[];
}

export class DatabaseItem implements IDatabaseItem {
  constructor(
    public id: string,
    public label: string,
    public price: number,
    public sale: number,
    public stock: number,
    public sex: Sex,
    public picture: string,
    public availableSizes: ITShirtSize[] | IShoeSize[],
    public description: string,
    public attributes?: string[],
  ) { }
}

export type Sex = 'men' | 'women' | 'unisex';
export type TShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export interface ITShirtSize {
  size: TShirtSize;
  stock: number;
}
export type ShoeSize = 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export interface IShoeSize {
  size: ShoeSize;
  stock: number;
}
