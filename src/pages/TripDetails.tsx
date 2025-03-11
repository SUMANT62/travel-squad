import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { fetchTripById, joinTrip, Trip } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => id ? fetchTripById(id) : null,
    enabled: !!id
  });

  const handleJoinTrip = async () => {
    if (!user || !trip) return;
    
    try {
      await joinTrip(trip._id, user.id, user.name);
      toast({
        title: "Successfully joined trip!",
        description: "You have been added to the trip's participants.",
      });
      // Refetch trip data
      // queryClient.invalidateQueries(['trip', id]);
    } catch (error) {
      toast({
        title: "Error joining trip",
        description: "Could not join the trip. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 page-transition">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">Loading trip details...</div>
            </div>
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
        <main className="flex-1 pt-32 pb-16 page-transition">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">Trip not found.</div>
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
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 space-y-6">
              <h1 className="text-3xl font-bold">{trip.title}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  {trip.destination}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-1" />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
              </div>
              
              <img src={trip.image} alt={trip.title} className="w-full rounded-md aspect-video object-cover" />
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About this Trip</h2>
                <p>{trip.description}</p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Itinerary</h2>
                <ul className="list-disc list-inside">
                  {trip.itinerary.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Food & Accommodation</h2>
                <p><strong>Food:</strong> {trip.food}</p>
                <p><strong>Accommodation:</strong> {trip.accommodation}</p>
                <p><strong>Transportation:</strong> {trip.transportation}</p>
              </div>

              {user ? (
                <Button onClick={handleJoinTrip}>Join Trip</Button>
              ) : (
                <Button onClick={() => navigate('/login')}>Login to Join Trip</Button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TripDetails;
