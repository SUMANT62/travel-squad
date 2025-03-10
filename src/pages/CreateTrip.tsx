
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, CreditCard, Camera, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageUpload from '@/components/ui-elements/ImageUpload';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

// API URL - will need to be updated with your actual API URL when deployed
const API_URL = "http://localhost:3000/api";

const CreateTrip = () => {
  const { user, updateTripCount } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Form state
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [accommodation, setAccommodation] = useState('hotel');
  const [transportation, setTransportation] = useState('flight');
  const [mealPlan, setMealPlan] = useState('none');
  const [costDetails, setCostDetails] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleImageUpload = (url: string) => {
    setImages([...images, url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check if user still has free trips or has paid
      const hasFreeTripLeft = await updateTripCount();
      
      if (!hasFreeTripLeft && !user?.hasPaid) {
        // User has no free trips left and hasn't paid
        setShowPaymentDialog(true);
        setIsSubmitting(false);
        return;
      }
      
      // Process trip creation
      // In a real implementation, this would be an API call to create the trip
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Trip created successfully!",
        description: "Your new trip has been created and is now visible to others.",
      });
      
      navigate('/travel-rooms');
    } catch (error) {
      console.error("Error creating trip:", error);
      toast({
        title: "Failed to create trip",
        description: "An error occurred while creating your trip. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToPayment = async () => {
    setPaymentLoading(true);
    
    try {
      // In a real implementation, this would be an API call to create a payment session
      // const response = await fetch(`${API_URL}/payments/create-session`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('travelAppToken')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     amount: 10, // ₹10 per trip
      //     returnUrl: window.location.href
      //   })
      // });
      
      // if (!response.ok) throw new Error('Failed to create payment session');
      // const { redirectUrl } = await response.json();
      // window.location.href = redirectUrl;
      
      // For now, just simulate the payment process with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful payment
      toast({
        title: "Payment successful!",
        description: "You can now create your trip.",
      });
      
      setShowPaymentDialog(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "We couldn't process your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Create a New Trip</h1>
            
            {user.freeTripsLeft > 0 ? (
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Free Trips Remaining</AlertTitle>
                <AlertDescription>
                  You have {user.freeTripsLeft} free trip{user.freeTripsLeft > 1 ? 's' : ''} left. After that, each trip creation will cost ₹10.
                </AlertDescription>
              </Alert>
            ) : !user.hasPaid && (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Payment Required</AlertTitle>
                <AlertDescription>
                  You've used all your free trips. Creating a new trip will cost ₹10.
                </AlertDescription>
              </Alert>
            )}
            
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
                      <Input 
                        id="destination" 
                        placeholder="e.g., Paris, France" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input 
                        id="duration" 
                        type="number" 
                        min="1" 
                        placeholder="e.g., 7" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate" 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input 
                        id="maxParticipants" 
                        type="number" 
                        min="2" 
                        placeholder="e.g., 5" 
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Trip Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your trip, activities, and what participants can expect..." 
                      className="min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                      <Input 
                        id="estimatedCost" 
                        type="number" 
                        min="0" 
                        placeholder="e.g., 15000" 
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accommodation">Accommodation Type</Label>
                      <Select 
                        value={accommodation} 
                        onValueChange={setAccommodation}
                      >
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
                      <Select 
                        value={transportation} 
                        onValueChange={setTransportation}
                      >
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
                      <Select 
                        value={mealPlan} 
                        onValueChange={setMealPlan}
                      >
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
                      value={costDetails}
                      onChange={(e) => setCostDetails(e.target.value)}
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
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscription Payment Required</DialogTitle>
            <DialogDescription>
              You've used all your free trips. To create more trips, you'll need to pay ₹10 per trip.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span>Trip creation fee</span>
                <span className="font-semibold">₹10.00</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              We use Stripe for secure payment processing. You'll be redirected to complete your payment.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={redirectToPayment} disabled={paymentLoading}>
              {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
