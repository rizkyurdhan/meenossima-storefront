export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  images: string[];
  category: string;
  inStock: boolean;
  variants: {
    color?: string[];
    size?: string[];
  };
}

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    slug: 'zareen-gamis-formal',
    title: 'Zareen Gamis Formal',
    brand: 'MEENOSSIMA',
    price: 350000,
    description: 'A delicate and versatile formal gamis featuring an elegant cut for a flattering drape. Perfect for special occasions and formal events.',
    imageUrl: 'https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&q=80&w=800',
    ],
    category: 'dresses',
    inStock: true,
    variants: {
      size: ['S', 'M', 'L'],
      color: ['Sage', 'Dusty Pink']
    }
  },
  {
    id: 'prod_2',
    slug: 'zenna-daily-blouse',
    title: 'Zenna Daily Blouse',
    brand: 'MEENOSSIMA',
    price: 1850000,
    description: 'Breezy and effortless, our Zenna daily blouse is an everyday essential. Crafted from premium breathable material.',
    imageUrl: 'https://images.unsplash.com/photo-1570771887955-9d20fd91403e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1570771887955-9d20fd91403e?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'tops',
    inStock: true,
    variants: {
      size: ['S', 'M', 'L', 'XL'],
      color: ['Ivory', 'Olive']
    }
  },
  {
    id: 'prod_3',
    slug: 'zahra-one-set',
    title: 'Zahra One Set',
    brand: 'MEENOSSIMA',
    price: 295000,
    description: 'Matching top and wide-leg trousers that elongate the silhouette. Made from a structured yet comfortable blend.',
    imageUrl: 'https://images.unsplash.com/photo-1570771888011-1bef53d75e0b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1570771888011-1bef53d75e0b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'sets',
    inStock: true,
    variants: {
      size: ['All Size'],
    }
  },
  {
    id: 'prod_4',
    slug: 'hijab-instant-sporty-zhivia',
    title: 'Hijab Instant Sporty Zhivia',
    brand: 'MEENOSSIMA',
    price: 95000,
    description: 'Comfortable and practical instant sporty hijab, perfect for active days or casual wear. Available in various colors.',
    imageUrl: 'https://images.unsplash.com/photo-1574297500578-afae55026ff3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1574297500578-afae55026ff3?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'accessories',
    inStock: true,
    variants: {
      color: ['Black', 'Navy', 'Maroon', 'Grey']
    }
  },
  {
    id: 'prod_5',
    slug: 'ziba-dress',
    title: 'Ziba Dress',
    brand: 'MEENOSSIMA',
    price: 320000,
    description: 'Beautiful flowing Ziba dress with subtle detailing. Ideal for both daily wear and semi-formal gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1612307057748-b44842539a29?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1612307057748-b44842539a29?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'dresses',
    inStock: true,
    variants: {
      size: ['S', 'M', 'L', 'XL']
    }
  }
];

export const getFeaturedProducts = () => mockProducts.slice(0, 3);
export const getProductBySlug = (slug: string) => mockProducts.find(p => p.slug === slug);
