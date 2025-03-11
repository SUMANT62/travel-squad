
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5000/api"; // Change to your Node.js server URL

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

// Error handling helper
const handleApiError = (error: any): never => {
  console.error("API Error:", error);
  const errorMessage = error.response?.data?.message || "An error occurred while connecting to server";
  toast.error(errorMessage);
  throw error;
};

// Fetch all trips
export const fetchTrips = async (): Promise<Trip[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch a single trip
export const fetchTripById = async (id: string): Promise<Trip> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Join a trip
export const joinTrip = async (tripId: string, userId: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create a new trip
export const createTrip = async (tripData: Omit<Trip, '_id'>): Promise<Trip> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Upload image
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    return handleApiError(error);
  }
};
