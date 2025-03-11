
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { processPayment } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Upgrade = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const result = await processPayment(10); // ₹10 per trip
      if (result.success) {
        toast({
          title: "Payment successful!",
          description: "You can now create unlimited trips.",
        });
        navigate('/create-trip');
        window.scrollTo(0, 0);
      }
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Could not process your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Upgrade to Premium</h1>
              <p className="text-muted-foreground">
                Create unlimited trips and unlock premium features
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="flex items-center justify-center mb-8">
                <CreditCard size={48} className="text-primary" />
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">₹10 per trip</h2>
                  <p className="text-muted-foreground">One-time payment for each trip</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary" />
                    <span>Create unlimited trips</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary" />
                    <span>Access to premium features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary" />
                    <span>Priority support</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Upgrade Now'
                  )}
                </Button>
                
                <p className="text-sm text-center text-muted-foreground">
                  Secure payment processed by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upgrade;
