import { IDatabaseItem } from '../item/item.model';

export const items: IDatabaseItem[] = [
  {
    id: '1',
    label: 'T-shirt 1',
    price: 34.99,
    sale: 0,
    sex: 'men',
    pictures: [
      { src: 'assets/tshirt-men-1.jpeg', alt: '' },
      { src: 'assets/tshirt-men-1.jpeg', alt: '' },
      { src: 'assets/tshirt-men-1.jpeg', alt: '' }
    ],
    attributes: ['Cotton', 'Fair Trade'], availableSizes: [
      {
        size: 'XS',
        stock: 10
      },
      {
        size: 'S',
        stock: 10
      },
      {
        size: 'M',
        stock: 10
      },
      {
        size: 'L',
        stock: 10
      },
      {
        size: 'XL',
        stock: 10
      },
      {
        size: 'XXL',
        stock: 10
      },
      {
        size: 'XXXL',
        stock: 10
      }
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '2',
    label: 'T-shirt 2',
    price: 44.99,
    sale: 5,
    sex: 'men',
    pictures: [
      { src: 'assets/tshirt-men-2.jpeg', alt: '' },
      { src: 'assets/tshirt-men-2.jpeg', alt: '' },
      { src: 'assets/tshirt-men-2.jpeg', alt: '' }
    ],
    attributes: ['Polyester'], availableSizes: [
      {
        size: 'XS',
        stock: 10
      },
      {
        size: 'S',
        stock: 10
      },
      {
        size: 'M',
        stock: 10
      },
      {
        size: 'L',
        stock: 10
      },
      {
        size: 'XL',
        stock: 10
      },
      {
        size: 'XXL',
        stock: 10
      },
      {
        size: 'XXXL',
        stock: 10
      }
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '3',
    label: 'T-shirt 1',
    price: 29.99,
    sale: 5,
    sex: 'women',
    pictures: [
      { src: 'assets/tshirt-women-1.jpeg', alt: '' },
      { src: 'assets/tshirt-women-1.jpeg', alt: '' },
      { src: 'assets/tshirt-women-1.jpeg', alt: '' }
    ],
    attributes: ['Cotton', 'Fair Trade'],
    availableSizes: [
      {
        size: 'XS',
        stock: 10
      },
      {
        size: 'S',
        stock: 10
      },
      {
        size: 'M',
        stock: 10
      },
      {
        size: 'L',
        stock: 10
      },
      {
        size: 'XL',
        stock: 10
      },
      {
        size: 'XXL',
        stock: 10
      },
      {
        size: 'XXXL',
        stock: 10
      }
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '4',
    label: 'T-shirt 2',
    price: 39.99,
    sale: 0,
    sex: 'women',
    pictures: [
      { src: 'assets/tshirt-women-2.jpeg', alt: '' },
      { src: 'assets/tshirt-women-2.jpeg', alt: '' },
      { src: 'assets/tshirt-women-2.jpeg', alt: '' }
    ],
    attributes: ['Polyester'],
    availableSizes: [
      {
        size: 'XS',
        stock: 10
      },
      {
        size: 'S',
        stock: 10
      },
      {
        size: 'M',
        stock: 10
      },
      {
        size: 'L',
        stock: 10
      },
      {
        size: 'XL',
        stock: 10
      },
      {
        size: 'XXL',
        stock: 10
      },
      {
        size: 'XXXL',
        stock: 10
      }
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '5',
    label: 'Shoes 1',
    price: 39.99,
    sale: 5,
    sex: 'unisex',
    pictures: [
      { src: 'assets/shoes-unisex-1.jpeg', alt: '' },
      { src: 'assets/shoes-unisex-1.jpeg', alt: '' },
      { src: 'assets/shoes-unisex-1.jpeg', alt: '' }
    ],
    attributes: ['New'],
    availableSizes: [
      {
        size: '38',
        stock: 10
      },
      {
        size: '39',
        stock: 10
      },
      {
        size: '40',
        stock: 10
      },
      {
        size: '41',
        stock: 10
      },
      {
        size: '42',
        stock: 10
      },
      {
        size: '43',
        stock: 10
      },
      {
        size: '44',
        stock: 10
      },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '6',
    label: 'Shoes 2',
    price: 39.99,
    sale: 0,
    sex: 'unisex',
    pictures: [
      { src: 'assets/shoes-unisex-2.jpeg', alt: '' },
      { src: 'assets/shoes-unisex-2.jpeg', alt: '' },
      { src: 'assets/shoes-unisex-2.jpeg', alt: '' }
    ],
    attributes: ['New'],
    availableSizes: [
      {
        size: '38',
        stock: 10
      },
      {
        size: '39',
        stock: 10
      },
      {
        size: '40',
        stock: 10
      },
      {
        size: '41',
        stock: 10
      },
      {
        size: '42',
        stock: 10
      },
      {
        size: '43',
        stock: 10
      },
      {
        size: '44',
        stock: 10
      },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '7',
    label: 'Shoes 1',
    price: 39.99,
    sale: 5,
    sex: 'men',
    pictures: [
      { src: 'assets/shoes-men-1.jpeg', alt: '' },
      { src: 'assets/shoes-men-1.jpeg', alt: '' },
      { src: 'assets/shoes-men-1.jpeg', alt: '' }
    ],
    attributes: ['New'],
    availableSizes: [
      {
        size: '38',
        stock: 10
      },
      {
        size: '39',
        stock: 10
      },
      {
        size: '40',
        stock: 10
      },
      {
        size: '41',
        stock: 10
      },
      {
        size: '42',
        stock: 10
      },
      {
        size: '43',
        stock: 10
      },
      {
        size: '44',
        stock: 10
      },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '8',
    label: 'Shoes 2',
    price: 39.99,
    sale: 0,
    sex: 'men',
    pictures: [
      { src: 'assets/shoes-men-2.jpeg', alt: '' },
      { src: 'assets/shoes-men-2.jpeg', alt: '' },
      { src: 'assets/shoes-men-2.jpeg', alt: '' }
    ],
    attributes: ['New'],
    availableSizes: [
      {
        size: '38',
        stock: 10
      },
      {
        size: '39',
        stock: 10
      },
      {
        size: '40',
        stock: 10
      },
      {
        size: '41',
        stock: 10
      },
      {
        size: '42',
        stock: 10
      },
      {
        size: '43',
        stock: 10
      },
      {
        size: '44',
        stock: 10
      },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '9',
    label: 'Shoes 1',
    price: 39.99,
    sale: 5,
    sex: 'women',
    pictures: [
      { src: 'assets/shoes-women-1.jpeg', alt: '' },
      { src: 'assets/shoes-women-1.jpeg', alt: '' },
      { src: 'assets/shoes-women-1.jpeg', alt: '' }
    ],
    attributes: ['New'],
    availableSizes: [
      {
        size: '38',
        stock: 10
      },
      {
        size: '39',
        stock: 10
      },
      {
        size: '40',
        stock: 10
      },
      {
        size: '41',
        stock: 10
      },
      {
        size: '42',
        stock: 10
      },
      {
        size: '43',
        stock: 10
      },
      {
        size: '44',
        stock: 10
      },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
  {
    id: '10',
    label: 'Shoes 2',
    price: 39.99,
    sale: 0,
    sex: 'women',
    pictures: [
      { src: 'assets/shoes-women-2.jpeg', alt: '' },
      { src: 'assets/shoes-women-2.jpeg', alt: '' },
      { src: 'assets/shoes-women-2.jpeg', alt: '' }
    ],
    attributes: ['New'],
    availableSizes: [
      {
        size: '38',
        stock: 10
      },
      {
        size: '39',
        stock: 10
      },
      {
        size: '40',
        stock: 10
      },
      {
        size: '41',
        stock: 10
      },
      {
        size: '42',
        stock: 10
      },
      {
        size: '43',
        stock: 10
      },
      {
        size: '44',
        stock: 10
      },
    ],
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    In ut consequuntur doloribus, cumque fugit soluta atque perferendisdicta explicabo rem enim vel quidem molestias magni nemo vero?
    Enim, ut tenetur.`,
  },
];