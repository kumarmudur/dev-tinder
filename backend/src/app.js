const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send('user added successfully.');
    } catch (err) {
        res.status(400).send('Error creating user' + err.message);
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


