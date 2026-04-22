const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");

const { validateSignUpData } = require('../utils/validation');
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        // validation of data
        validateSignUpData(req);

        // encrypt the password
        const { firstName, lastName, emailId, password } = req.body || {};

        // Encrypt the password
        const passwordHash= await bcrypt.hash(password, 10);

        // creating a new instance of the user modal
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        })
        await user.save();
        res.send('user added successfully.');
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body || {};

        const user = await User.findOne({ emailId });
        if (!user) {
            res.status(401).send('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid) {

            // create JWT token
            const token = await user.getJWT();

            // the token to cookie and send the response back to the user
            res.cookie('token', token, {
                expires: new Date(Date.now() + 8 * 360000),
            });
            res.status(200).send('Login successful!');
        } else {
            throw new Error('Invalid credentials');
        }
        console.log(isPasswordValid);

    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
});


module.exports = authRouter;