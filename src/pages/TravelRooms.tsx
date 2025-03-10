
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, MapPin, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppBadge from '@/components/ui-elements/AppBadge';
import { useAuth } from '@/context/AuthContext';

// Mock trip data for demonstration
const mockTrips = [
  {
    id: 1,
    title: 'Weekend Getaway to Goa',
    destination: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    startDate: 'June 15, 2023',
    duration: '3 days',
    cost: '₹8,000',
    participants: 4,
    maxParticipants: 6
  },
  {
    id: 2,
    title: 'Backpacking through Manali',
    destination: 'Manali, India',
    image: 'https://images.unsplash.com/photo-1626621331169-5f34be280cbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    startDate: 'July 10, 2023',
    duration: '5 days',
    cost: '₹12,500',
    participants: 3,
    maxParticipants: 5
  },
  {
    id: 3,
    title: 'Cultural Tour in Rajasthan',
    destination: 'Jaipur, India',
    image: 'https://images.unsplash.com/photo-1599661046827-9dae0a7e0604?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    startDate: 'August 5, 2023',
    duration: '7 days',
    cost: '₹20,000',
    participants: 6,
    maxParticipants: 10
  },
  {
    id: 4,
    title: 'Trek to Valley of Flowers',
    destination: 'Uttarakhand, India',
    image: 'https://images.unsplash.com/photo-1592909632733-f5f365c93350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    startDate: 'July 25, 2023',
    duration: '6 days',
    cost: '₹15,000',
    participants: 7,
    maxParticipants: 12
  },
  {
    id: 5,
    title: 'Beach Holiday in Andaman',
    destination: 'Andaman Islands, India',
    image: 'https://images.unsplash.com/photo-1588416499018-d8c621effb4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    startDate: 'September 12, 2023',
    duration: '8 days',
    cost: '₹35,000',
    participants: 4,
    maxParticipants: 8
  },
  {
    id: 6,
    title: 'Spiritual Retreat in Varanasi',
    destination: 'Varanasi, India',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecde1c3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    startDate: 'October 1, 2023',
    duration: '4 days',
    cost: '₹10,000',
    participants: 5,
    maxParticipants: 15
  }
];

const TravelRooms = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrips, setFilteredTrips] = useState(mockTrips);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredTrips(mockTrips);
    } else {
      setFilteredTrips(
        mockTrips.filter(trip => 
          trip.title.toLowerCase().includes(term) || 
          trip.destination.toLowerCase().includes(term)
        )
      );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AppBadge variant="primary" className="mb-4">Discover</AppBadge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find Your Next Adventure
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Browse through student-organized trips, find companions, and embark on 
              memorable journeys together.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="text"
                  placeholder="Search destinations, trip types..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-initial">
                  <Filter size={16} className="mr-2" /> Filters
                </Button>
                
                {isAuthenticated && (
                  <Link to="/create-trip" className="flex-1 sm:flex-initial">
                    <Button className="w-full">
                      <Plus size={16} className="mr-2" /> New Trip
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Trips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <Link to={`/trips/${trip.id}`} key={trip.id}>
                <div className="group rounded-xl overflow-hidden bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft">
                  {/* Trip Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-white font-medium text-lg line-clamp-1">
                        {trip.title}
                      </h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin size={14} className="mr-1" />
                        <span>{trip.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trip Info */}
                  <div className="p-4">
                    <div className="flex flex-wrap justify-between gap-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar size={14} className="mr-1" />
                        <span>{trip.startDate} · {trip.duration}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users size={14} className="mr-1" />
                        <span>{trip.participants}/{trip.maxParticipants}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-medium">{trip.cost} per person</span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Empty state */}
          {filteredTrips.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No matching trips found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any trips matching your search criteria.
              </p>
              <Button onClick={() => {setSearchTerm(''); setFilteredTrips(mockTrips);}}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TravelRooms;
