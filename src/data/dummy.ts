export type RoomCategory = 'Luxury' | 'Premium' | 'Suite';

export interface Room {
  id: string;
  name: string;
  category: RoomCategory;
  price: number;
  description: string;
  amenities: string[];
  images: string[];
  size: string;
  bedType: string;
}

// Generate 17 rooms
const generateRooms = (): Room[] => {
  const rooms: Room[] = [];
  
  // 8 Luxury Rooms
  for (let i = 1; i <= 8; i++) {
    rooms.push({
      id: `lux-${i}`,
      name: `Luxury Room ${i}`,
      category: 'Luxury',
      price: 250,
      description: 'Experience comfort and elegance in our Luxury Room, featuring modern amenities and a serene ambiance perfect for relaxation.',
      amenities: ['King Size Bed', 'AC', 'Free WiFi', 'Smart TV', 'Mini Bar', 'Rain Shower'],
      images: [
        `https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1582719478250-c89402bb17cb?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop`
      ],
      size: '350 sq ft',
      bedType: '1 King Bed'
    });
  }

  // 6 Premium Rooms
  for (let i = 1; i <= 6; i++) {
    rooms.push({
      id: `prem-${i}`,
      name: `Premium Room ${i}`,
      category: 'Premium',
      price: 350,
      description: 'Our Premium Rooms offer enhanced space and upgraded amenities, including stunning city views and a comfortable seating area.',
      amenities: ['King Size Bed', 'AC', 'Free WiFi', 'Smart TV', 'Mini Bar', 'Bathtub', 'City View'],
      images: [
        `https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1598928506311-c55dd5831cb2?q=80&w=800&auto=format&fit=crop`
      ],
      size: '450 sq ft',
      bedType: '1 King Bed'
    });
  }

  // 3 Suites
  for (let i = 1; i <= 3; i++) {
    rooms.push({
      id: `ste-${i}`,
      name: `Grand Suite ${i}`,
      category: 'Suite',
      price: 600,
      description: 'The pinnacle of luxury. Our Grand Suites feature a separate living area, panoramic views, and exclusive access to our premium services.',
      amenities: ['King Size Bed', 'AC', 'Free WiFi', 'Smart TV', 'Mini Bar', 'Jacuzzi', 'Living Area', 'Butler Service'],
      images: [
        `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=800&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop`
      ],
      size: '750 sq ft',
      bedType: '1 King Bed + Sofa Bed'
    });
  }

  return rooms;
};

export const roomsData = generateRooms();

export const restaurantMenu = [
  {
    category: 'Starters',
    items: [
      { name: 'Truffle Mushroom Arancini', description: 'Crispy risotto balls with truffle aioli', price: 18 },
      { name: 'Pan-Seared Scallops', description: 'Cauliflower purée, crispy pancetta, herb oil', price: 24 },
      { name: 'Burrata Salad', description: 'Heirloom tomatoes, basil pesto, balsamic glaze', price: 16 }
    ]
  },
  {
    category: 'Main Course',
    items: [
      { name: 'Filet Mignon', description: 'Potato gratin, asparagus, red wine jus', price: 48 },
      { name: 'Miso Glazed Black Cod', description: 'Bok choy, ginger dashi broth', price: 42 },
      { name: 'Wild Mushroom Risotto', description: 'Arborio rice, parmesan crisp, truffle oil', price: 28 }
    ]
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Dark Chocolate Fondant', description: 'Vanilla bean ice cream, berry compote', price: 14 },
      { name: 'Classic Tiramisu', description: 'Espresso soaked ladyfingers, mascarpone cream', price: 12 }
    ]
  }
];

export const cafeMenu = [
  {
    category: 'Coffees',
    items: [
      { name: 'Espresso', description: 'Single origin arabica beans', price: 4 },
      { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 5 },
      { name: 'Caramel Macchiato', description: 'Vanilla syrup, espresso, milk, caramel drizzle', price: 6 }
    ]
  },
  {
    category: 'Teas',
    items: [
      { name: 'Earl Grey', description: 'Black tea with bergamot oil', price: 4 },
      { name: 'Chamomile', description: 'Soothing herbal tea', price: 4 },
      { name: 'Matcha Latte', description: 'Premium green tea powder with steamed milk', price: 6 }
    ]
  },
  {
    category: 'Snacks',
    items: [
      { name: 'Butter Croissant', description: 'Freshly baked, flaky and buttery', price: 5 },
      { name: 'Avocado Toast', description: 'Sourdough, cherry tomatoes, microgreens', price: 12 },
      { name: 'Blueberry Muffin', description: 'Streusel topping, warm', price: 4 }
    ]
  }
];

export const banquetsData = [
  {
    id: 'bq-1',
    name: 'The Grand Ballroom',
    capacity: '500 Guests',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    description: 'Our largest and most opulent venue, perfect for grand weddings and major corporate events.',
    amenities: ['Stage', 'Dance Floor', 'AV System', 'Private Bar', 'Bridal Suite']
  },
  {
    id: 'bq-2',
    name: 'Crystal Pavilion',
    capacity: '250 Guests',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    description: 'A stunning glass-enclosed space offering natural light and elegant chandeliers.',
    amenities: ['Natural Light', 'AV System', 'Outdoor Terrace Access']
  },
  {
    id: 'bq-3',
    name: 'The Heritage Hall',
    capacity: '150 Guests',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    description: 'Classic wood paneling and warm lighting make this ideal for intimate gatherings and dinners.',
    amenities: ['Fireplace', 'Built-in Bar', 'AV System']
  },
  {
    id: 'bq-4',
    name: 'Executive Boardroom',
    capacity: '30 Guests',
    price: 800,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    description: 'State-of-the-art meeting space designed for high-level corporate meetings and presentations.',
    amenities: ['Video Conferencing', 'Smart Board', 'Coffee Station', 'High-Speed WiFi']
  }
];
