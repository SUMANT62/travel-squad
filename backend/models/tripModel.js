
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  participants: {
    type: Number,
    default: 0
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  itinerary: {
    type: [String],
    default: []
  },
  food: {
    type: String,
    default: ''
  },
  accommodation: {
    type: String,
    default: ''
  },
  transportation: {
    type: String,
    default: ''
  },
  organizer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  members: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
