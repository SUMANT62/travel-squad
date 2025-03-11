
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X, CreditCard, Loader2, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { processPayment } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface PlanProps {
  name: string;
  price: number;
  trips: number;
  isPopular?: boolean;
  features: string[];
}

const PricingPlan: React.FC<PlanProps> = ({ name, price, trips, isPopular, features }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      window.scrollTo(0, 0);
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processPayment(price, trips);
      if (result.success) {
        toast({
          title: "Payment successful!",
          description: `You can now create ${trips} trips.`,
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

  return (
    <div className={`glass-card p-6 flex flex-col h-full relative ${isPopular ? 'border-primary border-2' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="flex items-center justify-center mt-2">
          <IndianRupee size={20} className="text-primary" />
          <span className="text-3xl font-bold">{price}</span>
        </div>
        <p className="text-muted-foreground mt-1">{trips} trips</p>
      </div>
      
      <div className="space-y-3 flex-grow mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button 
        className="w-full mt-auto" 
        size="lg"
        onClick={handleSubscribe}
        disabled={isProcessing}
        variant={isPopular ? "default" : "outline"}
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard size={18} className="mr-2" />
            Subscribe Now
          </>
        )}
      </Button>
    </div>
  );
};

const FreePlan: React.FC = () => {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Free Plan</h3>
        <div className="flex items-center justify-center mt-2">
          <span className="text-3xl font-bold">₹0</span>
        </div>
        <p className="text-muted-foreground mt-1">2 trips</p>
      </div>
      
      <div className="space-y-3 flex-grow mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
          <span className="text-sm">Create up to 2 trips</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
          <span className="text-sm">Join unlimited trips</span>
        </div>
        <div className="flex items-center gap-3">
          <X size={18} className="text-destructive flex-shrink-0" />
          <span className="text-sm text-muted-foreground">Priority support</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-auto" 
        size="lg"
        variant="secondary"
        disabled
      >
        Available by Default
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 page-transition">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your travel needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FreePlan />
            
            <PricingPlan
              name="Basic"
              price={30}
              trips={5}
              features={[
                "Create up to 5 trips",
                "Join unlimited trips",
                "Basic trip templates",
                "Email support"
              ]}
            />
            
            <PricingPlan
              name="Standard"
              price={80}
              trips={15}
              isPopular={true}
              features={[
                "Create up to 15 trips",
                "Join unlimited trips",
                "Premium trip templates",
                "Priority email support",
                "Trip recommendations"
              ]}
            />
            
            <PricingPlan
              name="Premium"
              price={150}
              trips={30}
              features={[
                "Create up to 30 trips",
                "Join unlimited trips",
                "All premium features",
                "Priority support 24/7",
                "Custom trip planning",
                "Travel analytics"
              ]}
            />
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-left">
              <div>
                <h3 className="font-medium mb-2">How does the trip limit work?</h3>
                <p className="text-muted-foreground">Each subscription plan allows you to create a specific number of trips. Once you've used all your trips, you'll need to upgrade to continue creating trips.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Can I upgrade my plan later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade to a higher tier plan at any time. You'll only pay the difference between your current plan and the new one.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Do subscriptions expire?</h3>
                <p className="text-muted-foreground">No, once you purchase a plan, you can create that many trips at any time without expiration.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
