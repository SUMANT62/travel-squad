
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Send, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { fetchTripById, joinTrip, Trip } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
  }[]>([]);

  const { data: trip, isLoading, refetch } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => id ? fetchTripById(id) : Promise.resolve(null),
    enabled: !!id
  });

  const handleJoinTrip = async () => {
    if (!user || !trip) return;
    
    try {
      await joinTrip(trip._id, user.id, user.name);
      toast.success("Successfully joined trip!");
      refetch();
    } catch (error) {
      toast.error("Could not join the trip. Please try again.");
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !user) return;
    
    // In a real implementation, this would send to a backend
    const newMessage = {
      id: Math.random().toString(36).substring(7),
      sender: user.name,
      text: message,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
    
    // Demonstrate the feature with a toast
    toast.success("Message sent!");
  };

  // Share functionality
  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}/trips/${trip?._id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
    setShareDialogOpen(false);
  };

  const shareVia = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    if (!trip) return;
    
    const shareUrl = `${window.location.origin}/trips/${trip._id}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(trip.title);
    let shareLink = '';
    
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

  const isUserMember = user && trip.members.some(member => member.id === user.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{trip.title}</h1>
                <Button 
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 size={16} className="mr-2" /> Share
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  {trip.destination}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-1" />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users size={16} className="mr-1" />
                  {trip.members.length}/{trip.maxParticipants}
                </div>
              </div>
              
              <img src={trip.image} alt={trip.title} className="w-full rounded-md aspect-video object-cover" />
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About this Trip</h2>
                <p>{trip.description}</p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Itinerary</h2>
                <ul className="list-disc list-inside space-y-1">
                  {trip.itinerary.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Food</h3>
                  <p>{trip.food}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Accommodation</h3>
                  <p>{trip.accommodation}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Transportation</h3>
                  <p>{trip.transportation}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h2 className="text-xl font-semibold mb-4">Participants ({trip.members.length}/{trip.maxParticipants})</h2>
                <div className="flex flex-wrap gap-2">
                  {trip.members.map((member, index) => (
                    <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                      {member.name}
                      {member.id === trip.organizer.id && 
                        <span className="ml-1 text-primary">(Organizer)</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              {!isUserMember ? (
                user ? (
                  <Button 
                    onClick={handleJoinTrip}
                    disabled={trip.members.length >= trip.maxParticipants}
                  >
                    {trip.members.length >= trip.maxParticipants ? 'Trip Full' : 'Join Trip'}
                  </Button>
                ) : (
                  <Button onClick={() => navigate('/login')}>Login to Join Trip</Button>
                )
              ) : (
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium mb-2">You've joined this trip!</p>
                  <p className="text-xs text-muted-foreground">
                    You'll receive updates and can participate in the trip chat.
                  </p>
                </div>
              )}
              
              {/* Chat section - only visible to members */}
              {isUserMember && (
                <div className="pt-6 border-t border-border">
                  <h2 className="text-xl font-semibold mb-4">Trip Chat</h2>
                  
                  <div className="bg-muted rounded-md h-64 p-4 mb-4 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chatMessages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`p-3 rounded-lg max-w-[80%] ${
                              msg.sender === user?.name 
                                ? 'bg-primary text-primary-foreground ml-auto' 
                                : 'bg-background border border-border'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-xs">{msg.sender}</span>
                              <span className="text-xs opacity-70">
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            </div>
                            <p>{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button 
                      variant="secondary" 
                      size="icon"
                      onClick={sendMessage}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
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
                value={`${window.location.origin}/trips/${trip._id}`} 
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

export default TripDetails;
