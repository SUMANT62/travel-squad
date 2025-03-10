
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, ArrowRight } from 'lucide-react';
import AppBadge from './AppBadge';

export interface TripData {
  id: string;
  title: string;
  destination: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  price: number;
  totalSpots: number;
  spotsLeft: number;
  organizer: {
    name: string;
    id: string;
  };
}

interface TravelCardProps {
  trip: TripData;
}

const TravelCard: React.FC<TravelCardProps> = ({ trip }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(trip.price);

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate trip status based on availability
  const getTripStatus = () => {
    if (trip.spotsLeft === 0) {
      return <AppBadge variant="danger">Full</AppBadge>;
    } else if (trip.spotsLeft <= 3) {
      return <AppBadge variant="warning">Almost Full</AppBadge>;
    } else {
      return <AppBadge variant="success">Open</AppBadge>;
    }
  };

  return (
    <div className="glass-card overflow-hidden group h-full flex flex-col">
      <div className="relative">
        <img 
          src={trip.imageUrl || 'https://images.unsplash.com/photo-1682687981603-ae874bf432f2'} 
          alt={trip.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          {getTripStatus()}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-xl">{trip.title}</h3>
          <span className="font-medium text-lg">{formattedPrice}</span>
        </div>
        
        <div className="flex items-center mb-3 text-muted-foreground">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{trip.destination}</span>
        </div>
        
        <div className="flex items-center mb-4 text-muted-foreground">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>
        
        <div className="flex items-center mb-4 text-muted-foreground">
          <Users size={16} className="mr-1" />
          <span className="text-sm">
            {trip.spotsLeft} / {trip.totalSpots} spots left
          </span>
        </div>
        
        <div className="mt-auto">
          <Link 
            to={`/trip/${trip.id}`}
            className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Details <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
