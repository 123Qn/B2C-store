export type Product = {
  id: number;

  urlId: string;
  gender: string;
  name: string;
  brand: string;
  description: string;
  size : string[];
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

    urlId: "flag-embroidery-terry-quarter-zip-jumper",

    name: "Flag Embroidery Terry Quarter-Zip Jumper",
    brand: "Tommy-Hilfiger",
    gender: "Men",
    description:
      "Cozy and stylish quarter-zip jumper with embroidered flag design.",
    size : ["S","M","L","XL"],
    imageUrl:
      "https://pvh-brands.imgix.net/catalog/product/media/MW0MW43115_Z00_main.jpg?w=713&h=950&crop=edges&fit=crop&auto=compress&auto=format",

    category: "Hoodies",

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
    size : ["40","41","42","43","44"],
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
 brand: "Local-Brand",
    description:
      "Refresh your wardrobe with the Preview Textured Blazer, designed to help you look sharp and feel comfortable all day. The clever blend of polyester, viscose, and elastane delivers just the right amount of stretch, making this jacket a pleasure to wear from morning meetings to evening gatherings. The tailored fit flatters your shape, while the structured lapels and long sleeves give a polished edge. With useful front and chest pockets, a smooth lining, and secure twin button closure, this blazer is as practical as it is stylish. Ready to add a dash of charm to your look? Choose this blazer and step out feeling your best.",
    size : ["S","M","L","XL"],
    imageUrl:
      "https://assets.target.com.au/transform/217401b8-6a32-4a90-ad34-a560dd563d38/415_72078402_2-415T7207?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp",

    category: "Blazers",

    price: 49,

    stock: 20,

    sold: 88,

    active: true,
  },

  {
    id: 4,
gender: "Women",
    urlId: "beige-trench-coat",
brand: "Local-Brand",
    name: "Bailey Mini Dress",
size : ["S","M","L","XL"],
    description:
      "Bailey is a soft ivory base adorned with intricate red floral motifs, blending delicate linework with bold botanical detail. The Bailey Mini Dress features a V-neckline with a tie-front bodice, complete with blouson sleeves. Designed for daytime occasions that transition effortlessly into the evening. ",

    imageUrl:
      "https://www.kivari.com.au/cdn/shop/files/Bailey-Mini-Dress-ghost.jpg?v=1777324609&width=1000",

    category: "Dresses",

    price: 149,

    stock: 5,

    sold: 61,

    active: true,
  },

  {
    id: 5,

    urlId: "wireless-headphones-pro",
brand: "Tommy-Hilfiger",
    name: "Girls 3-7 Pointelle Cable Knit Relaxed Jumper",
    gender: "kids",
size : ["3-4","5-6","7-8"],
    description:
      "This pure cotton jumper is knitted with a pointelle texture and classic cable pattern, making it a cosy choice for unseasonal days.",

    imageUrl:
      "https://pvh-brands.imgix.net/catalog/product/media/KG0KG09223A_TIE_main.jpg?w=713&h=950&crop=edges&fit=crop&auto=compress&auto=format",

    category: "jumpers",

    price: 999,

    stock: 11,

    sold: 173,

    active: true,
  },

  {
    id: 6,
brand: "CROCs",
    urlId: "classic-belt-bag",

    name: "Classic Belt Bag",
size : ["Black","White","Pink"],
    description:
      "The Classic Belt Bag from Crocs is a stylish and functional accessory designed to keep your essentials close at hand. Made from durable materials, this belt bag features a spacious main compartment with a secure zipper closure, perfect for storing your phone, wallet, keys, and other small items. The adjustable strap allows for a comfortable fit around your waist or across your body, making it ideal for on-the-go activities. With its sleek design and iconic Crocs branding, the Classic Belt Bag is a must-have accessory for those who value both fashion and practicality.",

    imageUrl:
      "https://media.crocs.com/images/f_auto%2Cq_auto%2Cw_900%2Ch_900%2Cc_pad%2Cb_transparent/products/211701_001_ALT100/crocs.jpg",

    category: "Accessories",

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
size : ["S","M","L","XL"],
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