const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === 'xyz';
    if (!isAdminAuthorized) {
        res.status(401).send('Unauthorized request');
    } else {
        next();
    }
}

const userAuth =  async (req, res, next) => {
  // read the token from the req cookies
  // validate the token
  // find the user

    try {
        const { token } = req.cookies || {};

        if (!token) {
            throw new Error('Token is not valid');
        }

        const decodedObj = await jwt.verify(token, 'DEV@Tinder$790');

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized request' + error);
    }
};

module.exports = {
    adminAuth,
    userAuth
}