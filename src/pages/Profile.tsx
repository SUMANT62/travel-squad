
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Calendar, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchUserTrips } from '@/services/api';
import { Trip } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use React Query to fetch user trips with correct error handling
  const { 
    data: userTrips = [], 
    isLoading,
  } = useQuery({
    queryKey: ['userTrips', user?.id],
    queryFn: () => user ? fetchUserTrips(user.id) : Promise.resolve([]),
    enabled: !!user,
    meta: {
      onError: (err: any) => {
        console.error('Error fetching user trips:', err);
        toast({
          title: "Error loading trips",
          description: "Could not load your trips. Please try again later.",
          variant: "destructive"
        });
      }
    }
  });

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Handle user not authenticated
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile sidebar */}
              <div className="w-full md:w-1/3">
                <div className="glass-card p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User size={40} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <div className="w-full border-t border-border my-4"></div>
                  <div className="w-full">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Trips</span>
                      <span>{userTrips.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Premium</span>
                      <span>{user.hasPaid ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div className="w-full border-t border-border my-4"></div>
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
              
              {/* Profile content */}
              <div className="w-full md:w-2/3 space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium mb-4">Your Trips</h3>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 size={30} className="animate-spin text-primary" />
                    </div>
                  ) : userTrips.length > 0 ? (
                    <div className="space-y-4">
                      {userTrips.map((trip: Trip) => (
                        <div 
                          key={trip._id} 
                          className="flex items-center gap-4 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => {
                            navigate(`/trips/${trip._id}`);
                            window.scrollTo(0, 0);
                          }}
                        >
                          <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center">
                            <MapPin size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{trip.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={14} className="mr-1" />
                              <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">You haven't created or joined any trips yet.</p>
                      <Button 
                        onClick={() => {
                          navigate('/create-trip');
                          window.scrollTo(0, 0);
                        }}
                      >
                        Create Your First Trip
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium mb-4">Subscription Status</h3>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{user?.hasPaid ? 'Premium Plan' : 'Free Plan'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.hasPaid 
                            ? 'Unlimited trips and premium features' 
                            : `Free trips remaining: ${user?.freeTripsLeft} of 2`}
                        </p>
                      </div>
                      <CreditCard size={24} className="text-primary" />
                    </div>
                    {!user?.hasPaid && user?.freeTripsLeft === 0 && (
                      <Button className="w-full" onClick={() => navigate('/upgrade')}>
                        Upgrade to Premium (₹10/trip)
                      </Button>
                    )}
                  </div>
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

export default Profile;
