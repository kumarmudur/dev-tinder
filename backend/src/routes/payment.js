const express = require('express');

const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require('../utils/razorpay');
const paymentRouter = express.Router();

paymentRouter.post('/payment/create', userAuth, async (req, res) => {
    try {
       const order = await razorpayInstance.orders.create({
            amount: req.body.amount,
            currency: req.body.currency,
            receipt: 'receipt#1',
            notes: {
                firstName: 'value1',
                lastName: 'value2',
                membershipType: 'membership',
            }
        });

        //save to database
        // return back to response
        res.json({ order })
    } catch (error) {

    }
});


module.exports = paymentRouter;