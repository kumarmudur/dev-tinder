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

connectDB().then(() => {
    console.log("Connected to the database");
    app.listen(8080, () => {
        console.log('server is successfully listening on port 8080');
    });
}).catch(err => console.log('Database connection error:', err));


