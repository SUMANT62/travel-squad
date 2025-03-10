
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, DollarSign, Utensils, Bed, 
  Bus, Globe, ChevronLeft, Share2, Heart, MessageSquare, 
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppBadge from '@/components/ui-elements/AppBadge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { TripData } from '@/components/ui-elements/TravelCard';

// Mock trip details - would be replaced with API call
const getMockTrip = (tripId: string): TripData & {
  description: string;
  itinerary: string[];
  food: string;
  accommodation: string;
  transportation: string;
  members: {id: string; name: string}[];
} => {
  return {
    id: tripId,
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
    description: 'Join us for a week-long backpacking adventure in the beautiful mountains of Himachal Pradesh. We\'ll explore stunning landscapes, visit local villages, and experience the unique culture of the region. This trip is perfect for adventure seekers who love nature and are looking for an affordable way to explore the Himalayas.',
    itinerary: [
      'Day 1: Arrival in Manali, welcome dinner',
      'Day 2: Local sightseeing and acclimatization',
      'Day 3: Trek to Jogini Waterfall',
      'Day 4: Visit to Solang Valley',
      'Day 5: Day trip to Naggar Castle and Roerich Art Gallery',
      'Day 6: Explore Old Manali and riverside cafes',
      'Day 7: Free day for shopping or optional activities',
      'Day 8: Departure day'
    ],
    food: 'Most meals will be at local restaurants and cafes. We\'ll have group dinners at least 3 times during the trip. Breakfast is included at our accommodation.',
    accommodation: 'Shared rooms in a budget-friendly hostel in Old Manali. All rooms have basic amenities and hot water.',
    transportation: 'Local buses and shared taxis for day trips. Airport pickup can be arranged for an additional fee.',
    members: [
      { id: 'user1', name: 'Rahul Singh' },
      { id: 'user2', name: 'Priya Sharma' },
      { id: 'user3', name: 'Amit Kumar' },
      { id: 'user4', name: 'Neha Patel' },
      { id: 'user5', name: 'Vikram Chauhan' },
      { id: 'user6', name: 'Deepa Nair' }
    ]
  };
};

const TripDetails = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<ReturnType<typeof getMockTrip> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    const fetchTripDetails = async () => {
      setIsLoading(true);
      try {
        // This would be an API call in a real application
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (tripId) {
          setTrip(getMockTrip(tripId));
        }
      } catch (error) {
        console.error('Error fetching trip details:', error);
        toast.error('Failed to load trip details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handleJoinTrip = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to join this trip');
      navigate('/login');
      return;
    }

    setIsJoining(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user has reached free trip limit
      if (user && user.tripCount >= 2 && !user.hasPaid) {
        navigate('/profile?showPayment=true');
        toast.error('You\'ve reached your free trip limit. Please subscribe to join more trips.');
        return;
      }
      
      toast.success('Successfully joined the trip!');
      
      // Update trip details to reflect the user has joined
      if (trip) {
        setTrip({
          ...trip,
          spotsLeft: trip.spotsLeft - 1,
          members: [...trip.members, { id: user!.id, name: user!.name }]
        });
      }
    } catch (error) {
      console.error('Error joining trip:', error);
      toast.error('Failed to join trip');
    } finally {
      setIsJoining(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isUserJoined = () => {
    return trip?.members.some(member => user && member.id === user.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-32 pb-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading trip details...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-32 pb-16">
          <div className="container-custom">
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Trip Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The trip you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/travel-rooms">
                <Button className="btn-primary">
                  Browse Other Trips
                </Button>
              </Link>
            </div>
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
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/travel-rooms" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} className="mr-1" /> Back to trips
            </Link>
          </div>
          
          {/* Trip hero */}
          <div className="relative rounded-xl overflow-hidden mb-12">
            <img 
              src={trip.imageUrl}
              alt={trip.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <AppBadge variant="primary">
                  {trip.spotsLeft > 0 ? `${trip.spotsLeft} spots left` : 'Full'}
                </AppBadge>
                <AppBadge variant="outline" className="bg-black/30 border-white/20">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </AppBadge>
                <AppBadge variant="outline" className="bg-black/30 border-white/20">
                  <MapPin size={14} className="mr-1" />
                  {trip.destination}
                </AppBadge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {trip.title}
              </h1>
              <p className="text-white/80">
                Organized by {trip.organizer.name}
              </p>
            </div>
          </div>
          
          {/* Content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <section className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Trip</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {trip.description}
                </p>
              </section>
              
              {/* Itinerary */}
              <section className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
                <ul className="space-y-3">
                  {trip.itinerary.map((day, index) => (
                    <li key={index} className="flex">
                      <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{day}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Details grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Accommodation */}
                <div className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    <Bed className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-medium">Accommodation</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {trip.accommodation}
                  </p>
                </div>
                
                {/* Food */}
                <div className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    <Utensils className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-medium">Food</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {trip.food}
                  </p>
                </div>
                
                {/* Transportation */}
                <div className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    <Bus className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-medium">Transportation</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {trip.transportation}
                  </p>
                </div>
              </section>
              
              {/* Participants */}
              <section className="glass-card p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Participants ({trip.members.length}/{trip.totalSpots})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trip.members.map((member) => (
                    <div 
                      key={member.id}
                      className="flex items-center bg-secondary rounded-full px-3 py-1"
                    >
                      <span 
                        className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-2"
                      >
                        {member.name.charAt(0)}
                      </span>
                      <span className="text-sm">
                        {member.name}
                        {member.id === trip.organizer.id && (
                          <span className="ml-1 text-xs text-muted-foreground">(Organizer)</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Trip summary card */}
              <div className="glass-card p-6 sticky top-24">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      minimumFractionDigits: 0,
                    }).format(trip.price)}
                  </h2>
                  <p className="text-muted-foreground text-sm">per person</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-muted-foreground text-sm">
                        {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24))} days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm font-medium">Group Size</p>
                      <p className="text-muted-foreground text-sm">
                        {trip.totalSpots} people max
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">
                        {trip.destination}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm font-medium">What's Included</p>
                      <p className="text-muted-foreground text-sm">
                        Accommodation, Some meals, Local transportation
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="space-y-3">
                  {trip.spotsLeft > 0 && !isUserJoined() ? (
                    <Button
                      className="w-full btn-primary h-12"
                      onClick={handleJoinTrip}
                      disabled={isJoining}
                    >
                      {isJoining ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        'Join This Trip'
                      )}
                    </Button>
                  ) : isUserJoined() ? (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12" disabled>
                      You've Joined This Trip
                    </Button>
                  ) : (
                    <Button className="w-full bg-destructive text-destructive-foreground h-12" disabled>
                      Trip is Full
                    </Button>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center justify-center">
                      <Heart size={18} className="mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center">
                      <Share2 size={18} className="mr-2" />
                      Share
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-center text-muted-foreground"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TripDetails;
