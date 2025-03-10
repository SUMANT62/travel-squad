
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    // Redirect to login if not authenticated
    React.useEffect(() => {
      navigate('/login');
    }, [navigate]);
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
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
                      <span>{user.tripCount}</span>
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
                  {user.tripCount > 0 ? (
                    <div className="space-y-4">
                      {/* For demo purposes - would be actual trips from API */}
                      {[...Array(Math.min(user.tripCount, 3))].map((_, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-4 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/trips/${index + 1}`)}
                        >
                          <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center">
                            <MapPin size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Trip to {['Paris', 'Tokyo', 'New York'][index % 3]}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={14} className="mr-1" />
                              <span>May {index + 10}, 2023</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">You haven't created or joined any trips yet.</p>
                      <Button onClick={() => navigate('/create-trip')}>
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
                        <h4 className="font-medium">{user.hasPaid ? 'Premium Plan' : 'Free Plan'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user.hasPaid 
                            ? 'Unlimited trips and premium features' 
                            : 'Create up to 2 trips for free'}
                        </p>
                      </div>
                      <CreditCard size={24} className="text-primary" />
                    </div>
                    {!user.hasPaid && user.tripCount >= 2 && (
                      <Button className="w-full">
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
