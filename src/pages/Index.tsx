
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Users, 
  Map, 
  CreditCard, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Globe,
  Star,
  PlayCircle,
  Compass
} from 'lucide-react';
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
        {/* Hero Section - Redesigned with angled sections and floating elements */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
            
            {/* Geometric shapes */}
            <div className="absolute top-1/4 right-10 w-32 h-32 border-2 border-primary/20 rounded-xl rotate-12 animate-float"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-primary/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-40 left-1/4 w-16 h-16 bg-primary/10 rounded-lg rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <AppBadge variant="primary" className="mb-6 animate-fade-in flex items-center gap-1 mx-auto md:mx-0">
                  <Sparkles size={14} className="animate-pulse" /> For Students, By Students
                </AppBadge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in animate-delay-100 leading-tight text-center md:text-left">
                  Connect, <span className="text-gradient inline-block relative">
                    Explore <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
                  </span>, and Travel <span className="text-gradient">Together</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 animate-fade-in animate-delay-200 text-center md:text-left">
                  Join a community of students who love to travel. Create or join group trips, 
                  share expenses, and make unforgettable memories together.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 animate-fade-in animate-delay-300">
                  <Button 
                    size="lg" 
                    className="px-8 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group rounded-full"
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
                    className="w-full sm:w-auto transition-all duration-300 hover:translate-y-[-2px] hover:border-primary rounded-full"
                    onClick={handleGetStarted}
                  >
                    Create Account
                  </Button>
                </div>
                
                <div className="flex items-center justify-center md:justify-start mt-10 space-x-6 animate-fade-in animate-delay-400">
                  <div className="flex -space-x-4">
                    {[
                      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                    ].map((src, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                        <img src={src} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Joined by 2,000+ students</p>
                    <div className="flex items-center text-muted-foreground">
                      <Star size={14} className="text-yellow-500 mr-1 fill-yellow-500" />
                      <span>4.9/5 rating</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 animate-fade-in animate-delay-200 relative">
                <div className="aspect-[4/3] relative z-10 rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 group transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Students traveling together" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating card element */}
                <div className="glass absolute -bottom-6 -left-6 md:bottom-8 md:-left-10 p-4 rounded-xl shadow-lg z-20 animate-fade-in animate-delay-500 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <Map size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Next Trip</p>
                      <p className="text-xs text-muted-foreground">Paris, France</p>
                    </div>
                  </div>
                </div>
                
                {/* Second floating element */}
                <div className="glass absolute -top-4 -right-4 md:top-10 md:-right-6 p-3 rounded-xl shadow-lg z-20 animate-fade-in animate-delay-600">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                      <Users size={16} />
                    </div>
                    <p className="text-xs font-medium">12 Travelers Joined</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trusted by section */}
            <div className="mt-20 text-center animate-on-scroll">
              <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">Trusted by students from</p>
              <div className="flex flex-wrap justify-center items-center gap-10">
                {["MIT", "Stanford", "Harvard", "Oxford", "Cambridge"].map((uni, index) => (
                  <div key={index} className="text-muted-foreground/70 font-semibold text-lg">
                    {uni}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section - Redesigned with cards and icons */}
        <section ref={featuresRef} className="py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 to-90% pointer-events-none"></div>
          
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
                  icon: <Users className="h-8 w-8 text-white" />,
                  title: "Travel Rooms",
                  description: "Create or join trip groups with other students sharing similar travel interests."
                },
                {
                  icon: <Map className="h-8 w-8 text-white" />,
                  title: "Trip Planning",
                  description: "Easily organize accommodation, transportation, and activities for your group."
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-white" />,
                  title: "Cost Sharing",
                  description: "Split expenses fairly and transparently among all trip participants."
                },
                {
                  icon: <Shield className="h-8 w-8 text-white" />,
                  title: "Safe Travel",
                  description: "Travel with verified students from your university for added security."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="animate-on-scroll transition-all duration-300 hover:translate-y-[-5px] group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 h-full relative overflow-hidden shadow-soft">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full -translate-x-8 -translate-y-8 transform"></div>
                    <div className="p-3 bg-white/20 backdrop-blur-sm w-fit rounded-xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-white">{feature.title}</h3>
                    <p className="text-white/90">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Video showcase */}
            <div className="mt-20 animate-on-scroll">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Travel experience video thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                    <Button 
                      size="icon" 
                      className="w-16 h-16 rounded-full bg-white text-primary hover:bg-white/90"
                    >
                      <PlayCircle className="h-8 w-8 fill-primary" />
                    </Button>
                  </div>
                  <div className="absolute bottom-8 left-8 glass p-4 rounded-xl max-w-md">
                    <h3 className="text-white text-lg font-medium mb-1">See TravelSquad in action</h3>
                    <p className="text-white/80 text-sm">Watch how students use our platform to create unforgettable experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works Section - Redesigned with better visual flow */}
        <section ref={stepsRef} className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background to-90% pointer-events-none"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
          
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
            
            <div className="relative">
              {/* Curved connector line */}
              <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-[70%] h-40">
                <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <path 
                    d="M0,100 C300,30 900,30 1200,100" 
                    stroke="url(#gradient)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="12 8" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary) / 0.5)" />
                      <stop offset="50%" stopColor="hsl(var(--primary) / 0.3)" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                {[
                  {
                    number: "01",
                    title: "Create an Account",
                    description: "Sign up with your email. Your first two trips are completely free.",
                    icon: <Users className="h-6 w-6 text-primary" />
                  },
                  {
                    number: "02",
                    title: "Find or Create Trips",
                    description: "Browse existing travel rooms or create your own trip with all the details.",
                    icon: <Compass className="h-6 w-6 text-primary" />
                  },
                  {
                    number: "03",
                    title: "Travel Together",
                    description: "Connect with your group, finalize plans, and enjoy your journey.",
                    icon: <Map className="h-6 w-6 text-primary" />
                  }
                ].map((step, index) => (
                  <div 
                    key={index} 
                    className="relative animate-on-scroll"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-background rounded-2xl shadow-soft p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-20">
                        {step.number}
                      </div>
                      
                      <div className="flex flex-col items-center pt-6">
                        <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-center">{step.title}</h3>
                        <p className="text-muted-foreground text-center">{step.description}</p>
                        <div className="mt-6 w-12 h-1 bg-primary/20 rounded-full group-hover:w-20 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 text-center animate-on-scroll">
              <Button 
                variant="default" 
                size="lg" 
                className="px-8 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group rounded-full"
                onClick={handleGetStarted}
              >
                Get Started <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - New section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10 pointer-events-none"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
              <AppBadge variant="primary" className="mb-4">Student Reviews</AppBadge>
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                What Students <span className="text-gradient">Say About Us</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Hear from fellow students who have used TravelSquad for their adventures
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "TravelSquad made it so easy to find travel buddies for my trip to Barcelona. We split costs and had the best time!",
                  name: "Alex Johnson",
                  role: "NYU Student",
                  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                },
                {
                  text: "As a solo traveler, I was nervous about my Europe trip. Found an amazing group through TravelSquad and made lifelong friends.",
                  name: "Priya Patel",
                  role: "Stanford Student",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                },
                {
                  text: "The cost-sharing feature is a game-changer! We saved so much on our Japan trip by splitting everything fairly.",
                  name: "Marcus Chen",
                  role: "UCLA Student",
                  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="inline-block text-yellow-500 fill-yellow-500 mr-1" />
                      ))}
                    </div>
                    <p className="text-foreground mb-6 flex-grow">"{testimonial.text}"</p>
                    <div className="flex items-center mt-auto">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - Redesigned with angled background */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent skew-y-3 origin-bottom-right transform -translate-y-10"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto rounded-3xl bg-white/10 backdrop-blur-md p-12 shadow-xl border border-white/20 animate-on-scroll">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight text-white">
                  Ready to Start Your Adventure?
                </h2>
                <p className="text-white/90 mb-10 text-lg max-w-2xl mx-auto">
                  Join thousands of students already using TravelSquad to create unforgettable travel experiences.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="default"
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-8 w-full sm:w-auto"
                    onClick={() => {
                      navigate('/signup');
                      window.scrollTo(0, 0);
                    }}
                  >
                    Create Free Account
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 w-full sm:w-auto"
                    onClick={() => {
                      navigate('/travel-rooms');
                      window.scrollTo(0, 0);
                    }}
                  >
                    Browse Trips
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
