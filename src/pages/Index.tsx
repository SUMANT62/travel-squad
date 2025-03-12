
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Users, Map, CreditCard, Shield, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppBadge from '@/components/ui-elements/AppBadge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  // Handle navigation to signup page
  const handleGetStarted = () => {
    navigate('/signup');
    // Ensure we scroll to the top of the page
    window.scrollTo(0, 0);
  };

  // Add scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the 'animate-on-scroll' class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
      // Initially hide the elements
      element.classList.add('opacity-0');
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <AppBadge variant="primary" className="mb-6 animate-fade-in flex items-center gap-1 mx-auto">
                <Sparkles size={14} className="animate-pulse" /> For Students, By Students
              </AppBadge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in animate-delay-100 leading-tight">
                Connect, <span className="text-gradient inline-block relative">
                  Explore <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
                </span>, and Travel <span className="text-gradient">Together</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in animate-delay-200 max-w-2xl mx-auto">
                Join a community of students who love to travel. Create or join group trips, 
                share expenses, and make unforgettable memories together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
                <Button 
                  size="lg" 
                  className="px-8 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group"
                  onClick={() => {
                    navigate('/travel-rooms');
                    window.scrollTo(0, 0);
                  }}
                >
                  Explore Trips <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto transition-all duration-300 hover:translate-y-[-2px] hover:border-primary"
                  onClick={handleGetStarted}
                >
                  Create Account
                </Button>
              </div>
              
              <div className="relative mt-16 animate-fade-in animate-delay-400 rounded-2xl shadow-xl overflow-hidden group transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none h-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Students traveling together" 
                  className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="glass p-4 rounded-xl inline-block">
                    <p className="font-medium">Start your journey today with fellow students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section ref={featuresRef} className="py-20 md:py-28 relative bg-secondary/30">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
              <AppBadge variant="secondary" className="mb-4 flex items-center gap-1 mx-auto">
                <Globe size={14} /> Features
              </AppBadge>
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                Everything you need for <span className="text-gradient">group travel</span>
              </h2>
              <p className="text-muted-foreground text-lg">
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
                <div 
                  key={index} 
                  className="glass-card p-6 flex flex-col animate-on-scroll transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 bg-primary/10 w-fit rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section ref={stepsRef} className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none"></div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
              <AppBadge variant="secondary" className="mb-4">Simple Process</AppBadge>
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                How <span className="text-gradient">TravelSquad</span> Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Getting started is easy. Create an account, browse trips or create your own, and start your adventure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 transform -translate-y-1/2"></div>
              
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
                  className="relative p-8 border border-primary/20 rounded-xl transition-all duration-300 hover:border-primary hover:shadow-lg bg-background/50 backdrop-blur-sm animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg z-20">
                    {step.number}
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-medium mb-3 text-center">{step.title}</h3>
                    <p className="text-muted-foreground text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center animate-on-scroll">
              <Button 
                variant="default" 
                size="lg" 
                className="px-8 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group"
                onClick={handleGetStarted}
              >
                Get Started <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-primary-foreground/90 mb-10 text-lg max-w-2xl mx-auto">
                Join thousands of students already using TravelSquad to create unforgettable travel experiences.
              </p>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                size="lg"
                onClick={() => {
                  navigate('/signup');
                  window.scrollTo(0, 0);
                }}
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
