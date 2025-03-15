
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, MapPin, Users, Calendar, Loader2, Share2, X, Bus, Car, Train, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppBadge from '@/components/ui-elements/AppBadge';
import { useAuth } from '@/context/AuthContext';
import { fetchTrips, Trip } from '@/services/api';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TravelRooms = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentShareUrl, setCurrentShareUrl] = useState('');
  const [currentShareTitle, setCurrentShareTitle] = useState('');
  const [transportFilter, setTransportFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Available transportation types
  const transportOptions = [
    { value: "", label: "All Transportation", icon: null },
    { value: "bus", label: "Bus", icon: <Bus size={16} className="mr-2" /> },
    { value: "train", label: "Train", icon: <Train size={16} className="mr-2" /> },
    { value: "flight", label: "Flight", icon: <Plane size={16} className="mr-2" /> },
    { value: "car", label: "Car", icon: <Car size={16} className="mr-2" /> }
  ];
  
  // Fetch trips from API
  useEffect(() => {
    fetchTripsWithFilters();
  }, [transportFilter]);
  
  // Function to fetch trips with filters
  const fetchTripsWithFilters = async () => {
    setIsLoading(true);
    try {
      const filters: { transportation?: string; destination?: string } = {};
      
      if (transportFilter) {
        filters.transportation = transportFilter;
      }
      
      const data = await fetchTrips(filters);
      setTrips(data);
      
      // Apply search filter if search term exists
      if (searchTerm) {
        applySearchFilter(data);
      } else {
        setFilteredTrips(data);
      }
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      toast.error("Failed to load trips. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applySearchFilter(trips, term);
  };
  
  // Apply search filter
  const applySearchFilter = (tripsToFilter: Trip[], term: string = searchTerm) => {
    if (term.trim() === '') {
      setFilteredTrips(tripsToFilter);
    } else {
      setFilteredTrips(
        tripsToFilter.filter(trip => 
          trip.title.toLowerCase().includes(term) || 
          trip.destination.toLowerCase().includes(term)
        )
      );
    }
  };

  // Handle sharing
  const handleShare = (e: React.MouseEvent, trip: Trip) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = `${window.location.origin}/trips/${trip._id}`;
    setCurrentShareUrl(shareUrl);
    setCurrentShareTitle(trip.title);
    setShareDialogOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentShareUrl);
    toast.success("Link copied to clipboard!");
    setShareDialogOpen(false);
  };

  // Handle transportation filter change
  const handleTransportChange = (value: string) => {
    setTransportFilter(value);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setTransportFilter("");
    setSearchTerm("");
    setShowFilters(false);
    fetchTripsWithFilters();
  };

  // Share via platforms
  const shareVia = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    let shareLink = '';
    const encodedUrl = encodeURIComponent(currentShareUrl);
    const encodedTitle = encodeURIComponent(currentShareTitle);
    
    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedTitle} - ${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
    }
    
    window.open(shareLink, '_blank');
    setShareDialogOpen(false);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 flex items-center justify-center page-transition">
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading trips...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
                <Popover open={showFilters} onOpenChange={setShowFilters}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-initial">
                      <Filter size={16} className="mr-2" /> 
                      Filters
                      {transportFilter && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 bg-background border border-border shadow-md z-50">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Filters</h3>
                        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
                          Reset all
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Transportation Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {transportOptions.map((option) => (
                            <button
                              key={option.value}
                              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                                transportFilter === option.value
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                              onClick={() => handleTransportChange(option.value)}
                            >
                              {option.icon}
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button size="sm" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                      </div>
                      
                      {transportFilter && (
                        <div className="pt-2 border-t">
                          <div className="flex flex-wrap gap-2 mt-2">
                            {transportFilter && (
                              <div className="bg-muted rounded-full px-3 py-1 text-xs flex items-center gap-1">
                                <span>Transportation: {transportOptions.find(o => o.value === transportFilter)?.label}</span>
                                <button 
                                  onClick={() => setTransportFilter("")}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {isAuthenticated && (
                  <Link to="/create-trip" className="flex-1 sm:flex-initial">
                    <Button className="w-full">
                      <Plus size={16} className="mr-2" /> New Trip
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Active filters display */}
            {transportFilter && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="bg-muted rounded-full px-3 py-1 text-xs flex items-center gap-1">
                  <span>Transportation: {transportOptions.find(o => o.value === transportFilter)?.label}</span>
                  <button 
                    onClick={() => setTransportFilter("")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Trips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <div key={trip._id} className="relative">
                <Link to={`/trips/${trip._id}`}>
                  <div className="group rounded-xl overflow-hidden bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft h-full">
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
                          <span>{new Date(trip.startDate).toLocaleDateString()} · {trip.duration}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users size={14} className="mr-1" />
                          <span>{trip.members.length}/{trip.maxParticipants}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">₹{trip.price} per person</span>
                        <div className="flex items-center">
                          {trip.transportation && (
                            <span className="mr-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                              {trip.transportation}
                            </span>
                          )}
                          <Button variant="ghost" size="sm" className="text-primary">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Share button */}
                <Button 
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 left-3 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                  onClick={(e) => handleShare(e, trip)}
                >
                  <Share2 size={14} />
                </Button>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {filteredTrips.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No matching trips found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any trips matching your search criteria.
              </p>
              <Button onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share This Trip</DialogTitle>
            <DialogDescription>
              Share this amazing trip opportunity with your friends
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <p className="text-sm font-medium mb-2">Share via:</p>
            <div className="flex gap-3 mb-6">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => shareVia('whatsapp')}
              >
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => shareVia('facebook')}
              >
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => shareVia('twitter')}
              >
                Twitter
              </Button>
            </div>
            
            <p className="text-sm font-medium mb-2">Or copy link:</p>
            <div className="flex items-center">
              <Input 
                value={currentShareUrl} 
                readOnly 
                className="flex-1"
              />
              <Button 
                variant="secondary" 
                className="ml-2"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default TravelRooms;
