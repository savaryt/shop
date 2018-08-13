import { DatabaseItem, Size, Image, Attribute } from '../item/item.model';

export const items: DatabaseItem[] = [
  {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    label: 'T-shirt Wrangler',
    price: 34.99,
    sale: 0,
    sizes: [
      { label: 'XS', stock: 10 },
      { label: 'S', stock: 10 },
      { label: 'M', stock: 10 },
      { label: 'L', stock: 10 },
      { label: 'XL', stock: 10 }
    ],
    pictures: [
      { src: 'assets/tshirt-men-1.jpeg', alt: 'tshirt' },
      { src: 'assets/tshirt-men-2.jpeg', alt: 'tshirt' },
    ],
    attributes: [
      { label: 'Cotton', color: 'primary' },
      { label: 'Fair trade', color: 'accent' },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
];
