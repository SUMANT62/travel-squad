
const User = require('../models/userModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Mock Stripe payment processing (in a real app, this would integrate with Stripe)
exports.processPayment = async (req, res) => {
  try {
    const { amount, trips } = req.body;
    const userId = req.user.id;

    // In a real implementation, you would use Stripe to create a payment intent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100, // Convert to cents
    //   currency: 'inr',
    //   metadata: { userId, trips },
    // });

    // For now, we'll simulate a successful payment
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with new subscription details
    user.hasPaid = true;
    user.freeTripsLeft = trips || 0;
    
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: 'Payment processed successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        hasPaid: user.hasPaid,
        freeTripsLeft: user.freeTripsLeft
      }
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'Payment processing failed', error: error.message });
  }
};
