
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Users, Map, CreditCard, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppBadge from '@/components/ui-elements/AppBadge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const navigate = useNavigate();

  // Handle navigation to signup page
  const handleGetStarted = () => {
    navigate('/signup');
    // Ensure we scroll to the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 page-transition">
        {/* Hero Section */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <AppBadge variant="primary" className="mb-6 animate-fade-in">For Students, By Students</AppBadge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in animate-delay-100">
                Connect, Explore, and Travel <span className="text-gradient">Together</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-200">
                Join a community of students who love to travel. Create or join group trips, 
                share expenses, and make unforgettable memories together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="btn-primary w-full sm:w-auto"
                  onClick={() => {
                    navigate('/travel-rooms');
                    window.scrollTo(0, 0);
                  }}
                >
                  Explore Trips <ChevronRight size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="btn-ghost w-full sm:w-auto"
                  onClick={handleGetStarted}
                >
                  Create Account
                </Button>
              </div>
              
              <div className="relative mt-16 animate-fade-in animate-delay-400">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none h-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Students traveling together" 
                  className="w-full h-[400px] object-cover rounded-xl shadow-soft"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AppBadge variant="secondary" className="mb-4">Features</AppBadge>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Everything you need for group travel
              </h2>
              <p className="text-muted-foreground">
                Our platform is designed specifically for student travelers, making it easy to plan, 
                collaborate, and travel together on a budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8 mb-4 text-primary" />,
                  title: "Travel Rooms",
                  description: "Create or join trip groups with other students sharing similar travel interests."
                },
                {
                  icon: <Map className="h-8 w-8 mb-4 text-primary" />,
                  title: "Trip Planning",
                  description: "Easily organize accommodation, transportation, and activities for your group."
                },
                {
                  icon: <CreditCard className="h-8 w-8 mb-4 text-primary" />,
                  title: "Cost Sharing",
                  description: "Split expenses fairly and transparently among all trip participants."
                },
                {
                  icon: <Shield className="h-8 w-8 mb-4 text-primary" />,
                  title: "Safe Travel",
                  description: "Travel with verified students from your university for added security."
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card p-6 flex flex-col">
                  {feature.icon}
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AppBadge variant="secondary" className="mb-4">Simple Process</AppBadge>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                How TravelSquad Works
              </h2>
              <p className="text-muted-foreground">
                Getting started is easy. Create an account, browse trips or create your own, and start your adventure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Create an Account",
                  description: "Sign up with your email. Your first two trips are completely free."
                },
                {
                  number: "02",
                  title: "Find or Create Trips",
                  description: "Browse existing travel rooms or create your own trip with all the details."
                },
                {
                  number: "03",
                  title: "Travel Together",
                  description: "Connect with your group, finalize plans, and enjoy your journey."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="relative p-6 border border-border rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-soft"
                >
                  <span className="text-5xl font-bold text-primary/10 absolute top-4 right-4">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="default" 
                size="lg" 
                className="btn-primary"
                onClick={handleGetStarted}
              >
                Get Started <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Join thousands of students already using TravelSquad to create unforgettable travel experiences.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleGetStarted}
              >
                Create Free Account
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
