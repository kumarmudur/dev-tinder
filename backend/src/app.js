const express = require('express');
const bcrypt = require('bcrypt');
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body || {};

        const user = await User.findOne({ emailId });
        if (!user) {
            res.status(401).send('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            res.status(200).send('Login successful!');
        } else {
            throw new Error('Invalid credentials');
        }
        console.log(isPasswordValid);

    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
});

// Get user by email
app.get('/user', async (req, res) => {
   const userEmailId = req.body.emailId;

   try {
       const user = await User.findOne({ emailId: userEmailId});
       if (!user) {
           res.status(404).send('User not found.');
       } else {
           res.send(user);
       }
    // const users = await User.find({ emailId: userEmailId });
    // if(users.length === 0) {
    //     res.status(404).send('User not found.');
    // } else {
    //    res.send(users);
    // }
   } catch (error) {
       console.log('Something went wrong', error);
   }
});

// Feed API - GET / feed - get all the users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send('Something went wrong' + error);
    }
});

// delete user
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send('user removed successfully.'+ user);

    } catch (error) {
        res.status(404).send('Something went wrong' + error);
    }
});

// update data of the user
app.patch('/user/:userId', async (req, res) => {
    const userId= req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];
        const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
        if (!isUpdateAllowed) {
            throw new Error('Update not allowed.');
        }
        if (data?.skills?.length > 10) {
            throw new Error('Skills must be less than 10 characters.');
        }
        await User.findByIdAndUpdate({ _id: userId}, data, {
            returnDocument: 'after',
            runValidators: true,
        });
        res.send('user updated successfully.');
    } catch (error) {
        res.status(404).send('Something went wrong ' + error.message);
    }
});

connectDB().then(() => {
    console.log("Connected to the database");
    app.listen(8080, () => {
        console.log('server is successfully listening on port 8080');
    });
}).catch(err => console.log('Database connection error:', err));


