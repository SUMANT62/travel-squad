
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gradient">TravelSquad</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/travel-rooms" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Explore Trips
          </Link>
          {isAuthenticated ? (
            <>
              <Link 
                to="/create-trip" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Create Trip
              </Link>
              <Link 
                to="/profile" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link to="/signup">
                <Button className="btn-primary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg p-4 flex flex-col space-y-4 md:hidden animate-slide-in">
            <Link 
              to="/travel-rooms" 
              className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-secondary"
            >
              Explore Trips
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/create-trip" 
                  className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-secondary"
                >
                  Create Trip
                </Link>
                <Link 
                  to="/profile" 
                  className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-secondary flex items-center gap-2"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-secondary w-full text-left flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-secondary"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-center font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
