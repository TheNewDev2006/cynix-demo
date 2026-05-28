export const mockProductOrders = [
  {
    id: 'FLI-2026-0038',
    customerName: 'Trisha Williams',
    items: [
      { productId: 'prod-1', name: 'Fairlady Luxury Bar Soap', variant: 'Rose', price: 3.50, quantity: 2 },
      { productId: 'prod-14', name: 'Fairlady Liquid Hand Soap', variant: 'Lavender', price: 5.25, quantity: 1 }
    ],
    totalAmount: 17.25, // (3.50*2 + 5.25) + 5 delivery
    deliveryFee: 5.00,
    date: '2026-05-25T14:30:00Z',
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    address: {
      street: '123 Palm Tree Lane',
      area: 'Cable Beach',
      island: 'New Providence'
    }
  },
  {
    id: 'FLI-2026-0039',
    customerName: 'Trisha Williams',
    items: [
      { productId: 'prod-6', name: 'Fairlady Soft Bath Tissue', variant: null, price: 9.99, quantity: 1 },
      { productId: 'prod-15', name: 'Fairlady Laundry Detergent', variant: 'Fresh Breeze', price: 14.99, quantity: 1 }
    ],
    totalAmount: 29.98,
    deliveryFee: 5.00,
    date: '2026-05-27T09:15:00Z',
    status: 'Confirmed',
    paymentMethod: 'Cash on Delivery',
    address: {
      street: '123 Palm Tree Lane',
      area: 'Cable Beach',
      island: 'New Providence'
    }
  },
  {
    id: 'FLI-2026-0040',
    customerName: 'Marcus Reid', // Just another customer
    items: [
      { productId: 'prod-11', name: 'Fairlady Hand & Body Lotion', variant: 'Shea & Almond', price: 7.50, quantity: 3 }
    ],
    totalAmount: 27.50,
    deliveryFee: 5.00,
    date: '2026-05-28T08:00:00Z',
    status: 'Out for Delivery',
    paymentMethod: 'Cash on Delivery',
    address: {
      street: '45 Sandy Lane',
      area: 'Lyford Cay',
      island: 'New Providence'
    }
  }
];
