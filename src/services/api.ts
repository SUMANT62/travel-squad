
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5000/api"; // Node.js backend URL

export interface Trip {
  _id: string;
  title: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  duration: string;
  price: number;
  participants: number;
  maxParticipants: number;
  description: string;
  itinerary: string[];
  food: string;
  accommodation: string;
  transportation: string;
  organizer: {
    id: string;
    name: string;
  };
  members: {
    id: string;
    name: string;
  }[];
}

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('travelAppToken');
};

// Mock data for development when API is not available
const generateMockTrips = (count: number): Trip[] => {
  const trips: Trip[] = [];
  const destinations = [
    'Goa, India', 
    'Mumbai, India',
    'Delhi, India',
    'Jaipur, India',
    'Kerala, India',
    'Manali, India',
    'Shimla, India',
    'Darjeeling, India',
    'Rishikesh, India',
    'Ladakh, India'
  ];
  
  const images = [
    'https://images.unsplash.com/photo-1516815231560-8f41ec531527',
    'https://images.unsplash.com/photo-1598030304671-5aa1d6f13fde',
    'https://images.unsplash.com/photo-1570157449775-a6a082ae85a3',
    'https://images.unsplash.com/photo-1598086676140-ea06fd572436',
    'https://images.unsplash.com/photo-1580289145978-08d0889df560',
    'https://images.unsplash.com/photo-1591017683260-5b588434642f',
    'https://images.unsplash.com/photo-1612437118782-4763567afda4',
    'https://images.unsplash.com/photo-1602311051918-a3c80b9fdf5a',
    'https://images.unsplash.com/photo-1607604043968-52109a20cb7f',
    'https://images.unsplash.com/photo-1586619057737-12fb578a5f52'
  ];
  
  for (let i = 0; i < count; i++) {
    const randomDest = Math.floor(Math.random() * destinations.length);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const durationDays = Math.floor(Math.random() * 7) + 2;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);

    trips.push({
      _id: `trip-${i+1}`,
      title: `Explore ${destinations[randomDest].split(',')[0]}`,
      destination: destinations[randomDest],
      image: `${images[i % images.length]}?&fit=crop&w=800&h=450`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      duration: `${durationDays} days`,
      price: Math.floor(Math.random() * 15000) + 5000,
      participants: Math.floor(Math.random() * 3) + 1,
      maxParticipants: Math.floor(Math.random() * 5) + 3,
      description: `Experience the beauty of ${destinations[randomDest]} with a group of like-minded travelers. This trip includes sightseeing, local cuisine, and cultural experiences.`,
      itinerary: [
        'Day 1: Arrival and welcome dinner',
        'Day 2: City tour and local sightseeing',
        'Day 3: Adventure activities and free time',
        `Day ${durationDays}: Departure`
      ],
      food: ['none', 'breakfast', 'half-board', 'full-board'][Math.floor(Math.random() * 4)],
      accommodation: ['hotel', 'hostel', 'apartment', 'camping'][Math.floor(Math.random() * 4)],
      transportation: ['flight', 'train', 'bus', 'car'][Math.floor(Math.random() * 4)],
      organizer: {
        id: 'org-1',
        name: 'Travel Organizer'
      },
      members: [
        {
          id: 'org-1',
          name: 'Travel Organizer'
        }
      ]
    });
  }
  
  return trips;
};

const MOCK_TRIPS = generateMockTrips(10);
const USE_MOCK_DATA = true; // Set to false when your backend is ready

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    // Check if we're using mock data for certain endpoints
    if (USE_MOCK_DATA) {
      if (endpoint === '/trips') {
        console.log('Using mock data for trips');
        return MOCK_TRIPS;
      }
      if (endpoint.startsWith('/trips/') && endpoint.includes('/join')) {
        const tripId = endpoint.split('/')[2];
        const mockTrip = MOCK_TRIPS.find(t => t._id === tripId);
        if (mockTrip) {
          console.log('Mock join trip successful');
          return { success: true };
        }
      }
      if (endpoint.startsWith('/trips/') && !endpoint.includes('/join')) {
        const tripId = endpoint.split('/')[2];
        const mockTrip = MOCK_TRIPS.find(t => t._id === tripId);
        if (mockTrip) {
          console.log('Using mock data for trip details');
          return mockTrip;
        }
      }
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error: any) {
    console.error("API Error:", error);
    const errorMessage = error.message || "An error occurred while connecting to server";
    toast.error(errorMessage);
    throw error;
  }
};

// Auth API
export const registerUser = async (name: string, email: string, password: string) => {
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = async (email: string, password: string) => {
  return apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const updateUserTripCount = async () => {
  if (USE_MOCK_DATA) {
    console.log('Mock update trip count successful');
    return true; // Simulate that user has free trips left
  }
  
  return apiRequest('/users/increment-trip-count', {
    method: 'POST',
  });
};

export const processPayment = async (amount: number, trips?: number): Promise<{ success: boolean }> => {
  if (USE_MOCK_DATA) {
    console.log('Mock payment successful');
    return { success: true };
  }
  
  return apiRequest('/payments/process', {
    method: 'POST',
    body: JSON.stringify({ amount, trips }),
  });
};

// Trip API
export const fetchTrips = async (): Promise<Trip[]> => {
  return apiRequest('/trips');
};

export const fetchTripById = async (id: string): Promise<Trip> => {
  return apiRequest(`/trips/${id}`);
};

export const fetchUserTrips = async (userId: string): Promise<Trip[]> => {
  if (USE_MOCK_DATA) {
    console.log('Using mock data for user trips');
    return MOCK_TRIPS.filter(trip => 
      trip.members.some(member => member.id === userId)
    );
  }
  
  return apiRequest(`/users/${userId}/trips`);
};

export const joinTrip = async (tripId: string, userId: string, userName: string): Promise<{ success: boolean }> => {
  if (USE_MOCK_DATA) {
    // Find the trip in mock data and add the user
    const tripIndex = MOCK_TRIPS.findIndex(t => t._id === tripId);
    if (tripIndex >= 0) {
      // Check if user is already a member
      if (!MOCK_TRIPS[tripIndex].members.some(m => m.id === userId)) {
        MOCK_TRIPS[tripIndex].members.push({ id: userId, name: userName });
        MOCK_TRIPS[tripIndex].participants += 1;
      }
    }
    return { success: true };
  }

  return apiRequest(`/trips/${tripId}/join`, {
    method: 'POST',
    body: JSON.stringify({ userId, userName }),
  });
};

export const createTrip = async (tripData: Omit<Trip, '_id'>): Promise<Trip> => {
  if (USE_MOCK_DATA) {
    console.log('Creating mock trip', tripData);
    const newTrip: Trip = {
      ...tripData,
      _id: `trip-${MOCK_TRIPS.length + 1}`,
    };
    MOCK_TRIPS.unshift(newTrip); // Add to beginning so it shows up first
    return newTrip;
  }

  return apiRequest('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData),
  });
};

// Upload API
export const uploadImage = async (file: File): Promise<string> => {
  if (USE_MOCK_DATA) {
    // For mock data, return a random unsplash image
    const mockImages = [
      'https://images.unsplash.com/photo-1516815231560-8f41ec531527',
      'https://images.unsplash.com/photo-1598030304671-5aa1d6f13fde',
      'https://images.unsplash.com/photo-1570157449775-a6a082ae85a3',
      'https://images.unsplash.com/photo-1598086676140-ea06fd572436',
      'https://images.unsplash.com/photo-1580289145978-08d0889df560'
    ];
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const randomIndex = Math.floor(Math.random() * mockImages.length);
    return `${mockImages[randomIndex]}?random=${Math.random()}&fit=crop&w=800&h=450`;
  }
  
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.imageUrl;
  } catch (error: any) {
    console.error("API Error:", error);
    toast.error("Failed to upload image. Please try again.");
    throw error;
  }
};
