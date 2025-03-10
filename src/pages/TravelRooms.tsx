
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MapPin, Calendar, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TravelCard, { TripData } from '@/components/ui-elements/TravelCard';
import AppBadge from '@/components/ui-elements/AppBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock data - would be replaced with API calls
const mockTrips: TripData[] = [
  {
    id: '1',
    title: 'Backpacking in Himachal',
    destination: 'Manali, Himachal Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9',
    startDate: '2023-12-15',
    endDate: '2023-12-22',
    price: 8000,
    totalSpots: 10,
    spotsLeft: 4,
    organizer: {
      name: 'Rahul Singh',
      id: 'user1',
    },
  },
  {
    id: '2',
    title: 'Weekend Beach Trip',
    destination: 'Goa, India',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    startDate: '2023-12-01',
    endDate: '2023-12-04',
    price: 6000,
    totalSpots: 8,
    spotsLeft: 2,
    organizer: {
      name: 'Priya Patel',
      id: 'user2',
    },
  },
  {
    id: '3',
    title: 'Cultural Tour of Rajasthan',
    destination: 'Jaipur, Rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
    startDate: '2024-01-10',
    endDate: '2024-01-17',
    price: 12000,
    totalSpots: 6,
    spotsLeft: 0,
    organizer: {
      name: 'Amit Kumar',
      id: 'user3',
    },
  },
  {
    id: '4',
    title: 'Kerala Backwaters Exploration',
    destination: 'Alleppey, Kerala',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    startDate: '2024-02-05',
    endDate: '2024-02-12',
    price: 14000,
    totalSpots: 12,
    spotsLeft: 8,
    organizer: {
      name: 'Deepa Nair',
      id: 'user4',
    },
  },
  {
    id: '5',
    title: 'Mountain Trek in Ladakh',
    destination: 'Leh, Ladakh',
    imageUrl: 'https://images.unsplash.com/photo-1537728534067-da3a990bce63',
    startDate: '2024-03-20',
    endDate: '2024-03-28',
    price: 20000,
    totalSpots: 8,
    spotsLeft: 5,
    organizer: {
      name: 'Vikram Singh',
      id: 'user5',
    },
  },
  {
    id: '6',
    title: 'Wildlife Safari',
    destination: 'Ranthambore, Rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
    startDate: '2024-01-25',
    endDate: '2024-01-29',
    price: 16000,
    totalSpots: 10,
    spotsLeft: 6,
    organizer: {
      name: 'Neha Sharma',
      id: 'user6',
    },
  },
];

const TravelRooms = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<TripData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    availableOnly: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        // This would be an API call in a real application
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrips(mockTrips);
        setFilteredTrips(mockTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = [...trips];
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(trip => 
        trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price filters
    if (filters.minPrice) {
      results = results.filter(trip => trip.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      results = results.filter(trip => trip.price <= parseInt(filters.maxPrice));
    }
    
    // Filter by availability
    if (filters.availableOnly) {
      results = results.filter(trip => trip.spotsLeft > 0);
    }
    
    setFilteredTrips(results);
  }, [searchTerm, filters, trips]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      availableOnly: false,
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Travel Rooms</h1>
                <p className="text-muted-foreground">
                  Browse and join trips created by fellow students
                </p>
              </div>
              
              <Link to="/create-trip">
                <Button className="btn-primary">
                  <Plus size={18} className="mr-2" /> Create Trip
                </Button>
              </Link>
            </div>
            
            {/* Search and filters */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by destination or trip name..."
                  className="pl-10 input-field"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <SlidersHorizontal size={18} />
                Filters
              </Button>
              
              {/* Filter indicators */}
              {(filters.minPrice || filters.maxPrice || filters.availableOnly) && (
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm"
                  onClick={clearFilters}
                >
                  <X size={16} /> Clear Filters
                </Button>
              )}
            </div>
            
            {/* Expanded filters */}
            {isFiltersOpen && (
              <div className="mt-4 p-4 border border-border rounded-lg animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min Price (₹)</label>
                    <Input
                      type="number"
                      name="minPrice"
                      placeholder="Min price"
                      className="input-field"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Price (₹)</label>
                    <Input
                      type="number"
                      name="maxPrice"
                      placeholder="Max price"
                      className="input-field"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="availableOnly"
                        className="rounded border-input h-4 w-4 text-primary focus:ring-primary"
                        checked={filters.availableOnly}
                        onChange={handleFilterChange}
                      />
                      <span className="ml-2 text-sm font-medium">Show available trips only</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading trips...</p>
            </div>
          ) : filteredTrips.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">{filteredTrips.length} trips found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map(trip => (
                  <TravelCard key={trip.id} trip={trip} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="No trips found" 
                  className="h-48 w-auto mx-auto rounded-lg opacity-50"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">No trips found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or create your own trip
              </p>
              <Link to="/create-trip">
                <Button className="btn-primary">
                  <Plus size={18} className="mr-2" /> Create a Trip
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TravelRooms;
