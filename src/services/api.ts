
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
  return apiRequest('/users/increment-trip-count', {
    method: 'POST',
  });
};

export const processPayment = async (amount: number, trips?: number): Promise<{ success: boolean }> => {
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
  return apiRequest(`/users/${userId}/trips`);
};

export const joinTrip = async (tripId: string, userId: string, userName: string): Promise<{ success: boolean }> => {
  return apiRequest(`/trips/${tripId}/join`, {
    method: 'POST',
    body: JSON.stringify({ userId, userName }),
  });
};

export const createTrip = async (tripData: Omit<Trip, '_id'>): Promise<Trip> => {
  return apiRequest('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData),
  });
};

// Upload API
export const uploadImage = async (file: File): Promise<string> => {
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
