
const User = require('../models/userModel');
const Trip = require('../models/tripModel');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        tripCount: user.tripCount,
        hasPaid: user.hasPaid,
        freeTripsLeft: user.freeTripsLeft,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        tripCount: user.tripCount,
        hasPaid: user.hasPaid,
        freeTripsLeft: user.freeTripsLeft,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user trips (created or joined)
const getUserTrips = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find trips created by user
    const createdTrips = await Trip.find({ 'organizer.id': userId });
    
    // Find trips where user is a member
    const joinedTrips = await Trip.find({ 'members.id': userId });
    
    // Combine and remove duplicates
    const allTrips = [...createdTrips];
    
    joinedTrips.forEach(trip => {
      const exists = allTrips.some(existingTrip => 
        existingTrip._id.toString() === trip._id.toString()
      );
      
      if (!exists) {
        allTrips.push(trip);
      }
    });
    
    res.json(allTrips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user's trip count
const updateTripCount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Increment trip count
    user.tripCount += 1;
    
    // Decrement free trips if available
    if (user.freeTripsLeft > 0) {
      user.freeTripsLeft -= 1;
    }
    
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      tripCount: updatedUser.tripCount,
      hasPaid: updatedUser.hasPaid,
      freeTripsLeft: updatedUser.freeTripsLeft
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUserTrips,
  updateTripCount
};
