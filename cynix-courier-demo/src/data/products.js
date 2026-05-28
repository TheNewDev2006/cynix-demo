export const products = [
  // Soaps & Body Wash
  {
    id: 'prod-1',
    name: 'Fairlady Luxury Bar Soap',
    category: 'Soaps & Body Wash',
    description: 'Rose & Shea Butter',
    price: 3.50,
    unit: 'bar',
    image: 'https://images.unsplash.com/photo-1600857062241-98f516a32008?w=800&q=80',
    inStock: true,
    featured: true,
    variants: ['Rose', 'Lavender', 'Coconut', 'Unscented']
  },
  {
    id: 'prod-2',
    name: 'Fairlady Antibacterial Bar Soap',
    category: 'Soaps & Body Wash',
    description: 'Everyday protection',
    price: 2.75,
    unit: 'bar',
    image: 'https://images.unsplash.com/photo-1607006411030-244e823528b1?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Original', 'Aloe Vera']
  },
  {
    id: 'prod-3',
    name: 'Fairlady Moisturising Body Wash',
    category: 'Soaps & Body Wash',
    description: '500ml',
    price: 8.99,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Mango', 'Vanilla', 'Fresh Cotton']
  },
  {
    id: 'prod-4',
    name: 'Fairlady Natural Glycerin Soap',
    category: 'Soaps & Body Wash',
    description: 'Handcrafted natural soap',
    price: 4.25,
    unit: 'bar',
    image: 'https://images.unsplash.com/photo-1584305574632-15948956bbbe?w=800&q=80',
    inStock: false,
    featured: true,
    variants: ['Honey & Oat', 'Charcoal', 'Tea Tree']
  },
  {
    id: 'prod-5',
    name: 'Fairlady Kids Gentle Body Wash',
    category: 'Soaps & Body Wash',
    description: 'Tear-free formula',
    price: 6.50,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Strawberry', 'Bubblegum']
  },

  // Bath & Tissue
  {
    id: 'prod-6',
    name: 'Fairlady Soft Bath Tissue',
    category: 'Bath & Tissue',
    description: '12-Roll Pack',
    price: 9.99,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=800&q=80',
    inStock: true,
    featured: true,
    variants: []
  },
  {
    id: 'prod-7',
    name: 'Fairlady Ultra Soft Bath Tissue',
    category: 'Bath & Tissue',
    description: '24-Roll Pack',
    price: 18.50,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800&q=80',
    inStock: true,
    featured: false,
    variants: []
  },
  {
    id: 'prod-8',
    name: 'Fairlady Facial Tissue Box',
    category: 'Bath & Tissue',
    description: 'Soft and gentle',
    price: 3.25,
    unit: 'box',
    image: 'https://images.unsplash.com/photo-1585566373739-1667b31ddcc9?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Regular', 'Aloe-Infused']
  },
  {
    id: 'prod-9',
    name: 'Fairlady Kitchen Paper Towels',
    category: 'Bath & Tissue',
    description: '6-Roll Pack',
    price: 7.75,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1584820927503-455b5d7d3d19?w=800&q=80',
    inStock: true,
    featured: true,
    variants: []
  },
  {
    id: 'prod-10',
    name: 'Fairlady Bamboo Bath Tissue',
    category: 'Bath & Tissue',
    description: '12-Roll Eco Pack',
    price: 12.99,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1605330386762-b91c0199e74f?w=800&q=80',
    inStock: true,
    featured: false,
    variants: []
  },

  // Personal Care
  {
    id: 'prod-11',
    name: 'Fairlady Hand & Body Lotion',
    category: 'Personal Care',
    description: '400ml',
    price: 7.50,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
    inStock: true,
    featured: true,
    variants: ['Cocoa Butter', 'Shea & Almond', 'Unscented']
  },
  {
    id: 'prod-12',
    name: 'Fairlady Exfoliating Sugar Scrub',
    category: 'Personal Care',
    description: '300g Jar',
    price: 11.00,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1556228720-1c27bef92120?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Brown Sugar & Honey', 'Coffee & Coconut']
  },
  {
    id: 'prod-13',
    name: 'Fairlady Shower Loofah Sponge',
    category: 'Personal Care',
    description: 'Soft bath sponge',
    price: 2.50,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1585223363412-2c67699908cf?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Pink', 'Blue', 'Yellow', 'White']
  },
  {
    id: 'prod-14',
    name: 'Fairlady Liquid Hand Soap (Pump)',
    category: 'Personal Care',
    description: 'Everyday hand wash',
    price: 5.25,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1584305574632-15948956bbbe?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Lavender', 'Citrus Burst', 'Original']
  },

  // Laundry & Home
  {
    id: 'prod-15',
    name: 'Fairlady Laundry Detergent Powder',
    category: 'Laundry & Home',
    description: '2kg Bag',
    price: 14.99,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80',
    inStock: true,
    featured: true,
    variants: ['Fresh Breeze', 'Mountain Clean']
  },
  {
    id: 'prod-16',
    name: 'Fairlady Fabric Softener',
    category: 'Laundry & Home',
    description: '1L Bottle',
    price: 9.50,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1584820927503-455b5d7d3d19?w=800&q=80',
    inStock: true,
    featured: false,
    variants: ['Lavender Fields', 'Ocean Breeze']
  }
];
