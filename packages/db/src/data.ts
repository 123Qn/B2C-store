export type Product = {
  id: number;

  urlId: string;
gender: string;
  name: string;
  brand: string;
  description: string;

  imageUrl: string;

  category: string;

  price: number;

  stock: number;

  sold: number;

  active: boolean;
};

export const products: Product[] = [
  {
    id: 1,

    urlId: "black-oversized-hoodie",

    name: "Black Oversized Hoodie",
    brand: "Urban-Style",
gender: "Women",
    description:
      "Premium oversized hoodie designed for everyday street fashion and comfort.",

    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",

    category: "Fashion",

    price: 79,

    stock: 14,

    sold: 120,

    active: true,
  },

  {
    id: 2,

    urlId: "white-minimal-sneakers",
    brand: "Puma",
    name: "White Minimal Sneakers",
gender: "Men",
    description:
      "Clean and modern sneakers perfect for casual and lifestyle outfits.",

    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",

    category: "Shoes",

    price: 120,

    stock: 8,

    sold: 250,

    active: true,
  },

  {
    id: 3,

    urlId: "Black-Oversized-Hoodie",
gender: "Men",
    name: "Black Oversized Hoodie",
 brand: "Ikea",
    description:
      "Minimalist home decor lamp with warm lighting and premium finish.",

    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

    category: "Hat",

    price: 49,

    stock: 20,

    sold: 88,

    active: true,
  },

  {
    id: 4,
gender: "Men",
    urlId: "beige-trench-coat",
brand: "Zara",
    name: "Beige Trench Coat",

    description:
      "Elegant trench coat inspired by timeless modern fashion aesthetics.",

    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",

    category: "Accessories",

    price: 149,

    stock: 5,

    sold: 61,

    active: true,
  },

  {
    id: 5,

    urlId: "wireless-headphones-pro",
brand: "Sony",
    name: "Wireless Headphones Pro",
    gender: "Men",

    description:
      "High-quality wireless headphones with immersive surround sound.",

    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",

    category: "Hat",

    price: 199,

    stock: 11,

    sold: 173,

    active: true,
  },

  {
    id: 6,
brand: "Ikea",
    urlId: "minimal-wood-chair",

    name: "Minimal Wood Chair",

    description:
      "Scandinavian-inspired wooden chair designed for modern interiors.",

    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

    category: "Shoes",

    price: 89,
gender: "Men",
    stock: 7,

    sold: 42,

    active: true,
  },
    {
    id: 7,
brand: "Ikea",
    urlId: "minimal-wood-chair",

    name: "Minimal Wood Chair",

    description:
      "Scandinavian-inspired wooden chair designed for modern interiors.",

    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

    category: "Shoes",

    price: 89,
gender: "Men",
    stock: 7,

    sold: 42,

    active: true,
  },
];