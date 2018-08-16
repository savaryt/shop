export class Item {
  constructor(
    public id: string,
    public label: string,
    public quantity: number,
    public price: number,
    public sizes: Size[],
    public size: string,
    public sex: string,
  ) { }
}

export class DatabaseItem {
  constructor(
    public createdAt: number,
    public updatedAt: number,
    public price: number,
    public sale: number,
    public label: string,
    public description: string,
    public pictures: Image[],
    public sizes: Size[],
    public attributes: Attribute[],
    public id?: string,
  ) { }
}

export type Sex = 'men' | 'women' | 'unisex';

export class Image {
  constructor(
    public src: string,
    public alt: string
  ) { }
}

export class Size {
  constructor(
    public label: string,
    public stock: number,
  ) { }
}

export class Attribute {
  constructor(
    public label: string,
    public color: string,
  ) { }
}