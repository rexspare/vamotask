export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderStatus {
  id: string;
  status: 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  timestamp: string;
  description: string;
}

export interface DriverInfo {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  photo: string;
}

export interface OrderTrackingData {
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  deliveryWindow: {
    start: string;
    end: string;
  };
  estimatedDelivery: string;
  currentStatus: 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  statusHistory: OrderStatus[];
  items: OrderItem[];
  totalAmount: number;
  driver?: DriverInfo;
  specialInstructions?: string;
  trackingNumber: string;
}

// Dummy data for demonstration - Array of orders
export const ordersData: OrderTrackingData[] = [
  {
    orderId: "ORD-2024-001234",
    customerName: "Sarah Johnson",
    deliveryAddress: "123 Maple Street, Apt 4B, San Francisco, CA 94102",
    deliveryWindow: {
      start: "17:00", // 5:00 PM
      end: "20:00"    // 8:00 PM
    },
    estimatedDelivery: "18:30", // 6:30 PM
    currentStatus: "out_for_delivery",
    statusHistory: [
      {
        id: "1",
        status: "preparing",
        timestamp: "2024-01-15T14:00:00Z",
        description: "Order received and meal prep started"
      },
      {
        id: "2", 
        status: "ready",
        timestamp: "2024-01-15T16:15:00Z",
        description: "Meals prepared and packaged"
      },
      {
        id: "3",
        status: "out_for_delivery", 
        timestamp: "2024-01-15T16:45:00Z",
        description: "Driver picked up your order"
      }
    ],
    items: [
      {
        id: "1",
        name: "Mediterranean Chicken Bowl",
        quantity: 2,
        price: 24.99
      },
      {
        id: "2", 
        name: "Quinoa Power Salad",
        quantity: 1,
        price: 12.99
      },
      {
        id: "3",
        name: "Protein Smoothie Pack",
        quantity: 1,
        price: 8.99
      }
    ],
    totalAmount: 46.97,
    driver: {
      name: "Mike Rodriguez",
      phone: "+1 (555) 123-4567",
      vehicle: "White Toyota Prius",
      rating: 4.8,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    specialInstructions: "Please ring doorbell twice. Leave at front door if no answer.",
    trackingNumber: "TRK789456123"
  },
  {
    orderId: "ORD-2024-001235",
    customerName: "John Smith",
    deliveryAddress: "456 Oak Avenue, Unit 12, Los Angeles, CA 90210",
    deliveryWindow: {
      start: "19:00", // 7:00 PM
      end: "22:00"    // 10:00 PM
    },
    estimatedDelivery: "20:15", // 8:15 PM
    currentStatus: "preparing",
    statusHistory: [
      {
        id: "1",
        status: "preparing",
        timestamp: "2024-01-15T18:00:00Z",
        description: "Order received and meal prep started"
      }
    ],
    items: [
      {
        id: "1",
        name: "Grilled Salmon with Vegetables",
        quantity: 1,
        price: 18.99
      },
      {
        id: "2", 
        name: "Caesar Salad",
        quantity: 1,
        price: 9.99
      },
      {
        id: "3",
        name: "Fresh Fruit Bowl",
        quantity: 1,
        price: 6.99
      }
    ],
    totalAmount: 35.97,
    specialInstructions: "Please call when arriving. Apartment building requires buzzer code: 1234",
    trackingNumber: "TRK789456124"
  },
  {
    orderId: "ORD-2024-001236",
    customerName: "Emily Davis",
    deliveryAddress: "789 Pine Street, Floor 3, Seattle, WA 98101",
    deliveryWindow: {
      start: "12:00", // 12:00 PM
      end: "15:00"    // 3:00 PM
    },
    estimatedDelivery: "13:30", // 1:30 PM
    currentStatus: "delivered",
    statusHistory: [
      {
        id: "1",
        status: "preparing",
        timestamp: "2024-01-15T10:00:00Z",
        description: "Order received and meal prep started"
      },
      {
        id: "2", 
        status: "ready",
        timestamp: "2024-01-15T11:30:00Z",
        description: "Meals prepared and packaged"
      },
      {
        id: "3",
        status: "out_for_delivery", 
        timestamp: "2024-01-15T12:00:00Z",
        description: "Driver picked up your order"
      },
      {
        id: "4",
        status: "delivered", 
        timestamp: "2024-01-15T13:25:00Z",
        description: "Order delivered successfully"
      }
    ],
    items: [
      {
        id: "1",
        name: "Veggie Buddha Bowl",
        quantity: 1,
        price: 14.99
      },
      {
        id: "2", 
        name: "Green Smoothie",
        quantity: 2,
        price: 11.98
      }
    ],
    totalAmount: 26.97,
    driver: {
      name: "Lisa Chen",
      phone: "+1 (555) 987-6543",
      vehicle: "Blue Honda Civic",
      rating: 4.9,
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    specialInstructions: "Leave at reception desk if no answer.",
    trackingNumber: "TRK789456125"
  }
];

// Helper function to find order by ID
export const findOrderById = (orderId: string): OrderTrackingData | undefined => {
  return ordersData.find(order => order.orderId === orderId);
};
