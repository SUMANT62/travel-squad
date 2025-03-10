
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, CreditCard, Camera, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageUpload from '@/components/ui-elements/ImageUpload';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CreateTrip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user's trip count (this would be done on the backend in a real app)
      // For demo purposes only
      toast({
        title: "Trip created successfully!",
        description: "Your new trip has been created and is now visible to others.",
      });
      navigate('/travel-rooms');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleImageUpload = (url: string) => {
    setImages([...images, url]);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Create a New Trip</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Details */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Trip Details
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="e.g., Paris, France" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input id="duration" type="number" min="1" placeholder="e.g., 7" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input id="maxParticipants" type="number" min="2" placeholder="e.g., 5" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Trip Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your trip, activities, and what participants can expect..." 
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Costs & Arrangements */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" />
                  Costs & Arrangements
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCost">Estimated Cost per Person (₹)</Label>
                      <Input id="estimatedCost" type="number" min="0" placeholder="e.g., 15000" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accommodation">Accommodation Type</Label>
                      <Select defaultValue="hotel">
                        <SelectTrigger id="accommodation">
                          <SelectValue placeholder="Select accommodation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="hostel">Hostel</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="camping">Camping</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="transportation">Transportation Type</Label>
                      <Select defaultValue="flight">
                        <SelectTrigger id="transportation">
                          <SelectValue placeholder="Select transportation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flight">Flight</SelectItem>
                          <SelectItem value="train">Train</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mealPlan">Meal Plan</Label>
                      <Select defaultValue="none">
                        <SelectTrigger id="mealPlan">
                          <SelectValue placeholder="Select meal plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Self-arranged</SelectItem>
                          <SelectItem value="breakfast">Breakfast only</SelectItem>
                          <SelectItem value="halfboard">Half board</SelectItem>
                          <SelectItem value="fullboard">Full board</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="costDetails">Cost Breakdown Details</Label>
                    <Textarea 
                      id="costDetails" 
                      placeholder="Break down the costs (accommodation, food, transportation, activities, etc.)" 
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Images */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Camera size={20} className="text-primary" />
                  Trip Images
                </h2>
                
                <div>
                  <Label className="mb-2 block">Upload Images (max 5)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Trip image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    
                    {images.length < 5 && (
                      <div className="aspect-square rounded-md border-2 border-dashed border-border flex items-center justify-center">
                        <ImageUpload onUpload={handleImageUpload}>
                          <div className="flex flex-col items-center text-muted-foreground">
                            <Plus size={24} />
                            <span className="text-xs mt-1">Add Image</span>
                          </div>
                        </ImageUpload>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add images of the destination to attract participants
                  </p>
                </div>
              </div>
              
              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Creating Trip...' : 'Create Trip'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTrip;
