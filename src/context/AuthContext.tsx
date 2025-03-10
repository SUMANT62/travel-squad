
import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  tripCount: number;
  hasPaid: boolean;
  freeTripsLeft: number; // Track free trips
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateTripCount: () => Promise<boolean>; // Returns if user still has free trips
};

// API URL - will need to be updated with your actual API URL when deployed
const API_URL = "http://localhost:3000/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status with backend
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('travelAppToken');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // In a real implementation, we would validate the token with our backend
        const response = await fetch(`${API_URL}/auth/validate`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token invalid, clear it
          localStorage.removeItem('travelAppToken');
        }
      } catch (error) {
        console.error('Auth validation error:', error);
        localStorage.removeItem('travelAppToken');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For now, we'll simulate API call since backend isn't built yet
      // Replace with actual API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login for now
      const demoUser = {
        id: `user-${Math.floor(Math.random() * 10000)}`,
        email,
        name: email.split('@')[0],
        tripCount: 0,
        hasPaid: false,
        freeTripsLeft: 2
      };
      
      setUser(demoUser);
      localStorage.setItem('travelAppToken', 'demo-token');
      
      /* Actual implementation would be:
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const { user, token } = await response.json();
      setUser(user);
      localStorage.setItem('travelAppToken', token);
      */
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
      // For now, we'll simulate API call since backend isn't built yet
      // Replace with actual API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup for now
      const newUser = {
        id: `user-${Math.floor(Math.random() * 10000)}`,
        email,
        name,
        tripCount: 0,
        hasPaid: false,
        freeTripsLeft: 2
      };
      
      setUser(newUser);
      localStorage.setItem('travelAppToken', 'demo-token');
      
      /* Actual implementation would be:
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      if (!response.ok) throw new Error('Signup failed');
      
      const { user, token } = await response.json();
      setUser(user);
      localStorage.setItem('travelAppToken', token);
      */
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
      // Update user trip count
      const updatedUser = {
        ...user,
        tripCount: user.tripCount + 1,
        freeTripsLeft: user.freeTripsLeft > 0 ? user.freeTripsLeft - 1 : 0
      };
      
      setUser(updatedUser);
      
      // Return if user still has free trips
      return updatedUser.freeTripsLeft > 0;
      
      /* Actual implementation would be:
      const response = await fetch(`${API_URL}/users/increment-trip-count`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('travelAppToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to update trip count');
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      return updatedUser.freeTripsLeft > 0;
      */
    } catch (error) {
      console.error('Error updating trip count:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelAppToken');
    
    /* Actual implementation might include:
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('travelAppToken')}`
      }
    }).catch(err => console.error('Logout error:', err));
    */
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
