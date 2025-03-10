
import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  tripCount: number;
  hasPaid: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('travelAppUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - would be replaced with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - in reality this would come from backend
      const demoUser = {
        id: `user-${Math.floor(Math.random() * 10000)}`,
        email,
        name: email.split('@')[0],
        tripCount: 0,
        hasPaid: false
      };
      
      setUser(demoUser);
      localStorage.setItem('travelAppUser', JSON.stringify(demoUser));
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
      // Simulate API call - would be replaced with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - in reality this would come from backend
      const newUser = {
        id: `user-${Math.floor(Math.random() * 10000)}`,
        email,
        name,
        tripCount: 0,
        hasPaid: false
      };
      
      setUser(newUser);
      localStorage.setItem('travelAppUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
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
        logout
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
