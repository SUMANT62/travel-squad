
const Trip = require('../models/tripModel');
const User = require('../models/userModel');

// Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new trip
const createTrip = async (req, res) => {
  try {
    const {
      title,
      destination,
      image,
      startDate,
      endDate,
      duration,
      price,
      maxParticipants,
      description,
      itinerary,
      food,
      accommodation,
      transportation,
      organizer
    } = req.body;

    const trip = new Trip({
      title,
      destination,
      image,
      startDate,
      endDate,
      duration,
      price,
      participants: 1, // Creator is first participant
      maxParticipants,
      description,
      itinerary,
      food,
      accommodation,
      transportation,
      organizer,
      members: [{ id: organizer.id, name: organizer.name }] // Creator is first member
    });

    const createdTrip = await trip.save();
    
    // Update user's trip count
    await User.findByIdAndUpdate(
      organizer.id,
      { $inc: { tripCount: 1 } }
    );
    
    res.status(201).json(createdTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join a trip
const joinTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { userId, userName } = req.body;
    
    const trip = await Trip.findById(tripId);
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    // Check if trip is already full
    if (trip.participants >= trip.maxParticipants) {
      return res.status(400).json({ message: 'Trip is already full' });
    }
    
    // Check if user is already a member
    const isMember = trip.members.some(member => member.id.toString() === userId);
    
    if (isMember) {
      return res.status(400).json({ message: 'You have already joined this trip' });
    }
    
    // Add user to members and increment participants count
    trip.members.push({ id: userId, name: userName });
    trip.participants += 1;
    
    const updatedTrip = await trip.save();
    
    res.json({ 
      success: true, 
      message: 'Successfully joined the trip',
      trip: updatedTrip
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTrips,
  getTripById,
  createTrip,
  joinTrip
};
