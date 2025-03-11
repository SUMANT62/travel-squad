
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser } from '@/services/api';

type User = {
  id: string;
  email: string;
  name: string;
  tripCount: number;
  hasPaid: boolean;
  freeTripsLeft: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateTripCount: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('travelAppToken');
        const userData = localStorage.getItem('travelAppUser');
        
        if (!token || !userData) {
          setIsLoading(false);
          return;
        }
        
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Auth validation error:', error);
        localStorage.removeItem('travelAppToken');
        localStorage.removeItem('travelAppUser');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      
      // Transform the response to match our User type
      const userData: User = {
        id: response._id,
        email: response.email,
        name: response.name,
        tripCount: response.tripCount,
        hasPaid: response.hasPaid,
        freeTripsLeft: response.freeTripsLeft
      };
      
      setUser(userData);
      localStorage.setItem('travelAppToken', response.token);
      localStorage.setItem('travelAppUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await registerUser(name, email, password);
      
      // Transform the response to match our User type
      const userData: User = {
        id: response._id,
        email: response.email,
        name: response.name,
        tripCount: response.tripCount,
        hasPaid: response.hasPaid,
        freeTripsLeft: response.freeTripsLeft
      };
      
      setUser(userData);
      localStorage.setItem('travelAppToken', response.token);
      localStorage.setItem('travelAppUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTripCount = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Here you would make an API call to update the trip count
      // For now we'll just update the local state
      const updatedUser = {
        ...user,
        tripCount: user.tripCount + 1,
        freeTripsLeft: user.freeTripsLeft > 0 ? user.freeTripsLeft - 1 : 0
      };
      
      setUser(updatedUser);
      localStorage.setItem('travelAppUser', JSON.stringify(updatedUser));
      
      return updatedUser.freeTripsLeft > 0;
    } catch (error) {
      console.error('Error updating trip count:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelAppToken');
    localStorage.removeItem('travelAppUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        logout,
        updateTripCount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
