const express = require('express');
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    } catch (error) {
        res.status(400).send("Error " + error.message);
    }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
           $or: [
               { toUserId: loggedInUser._id, status: "accepted" },
               { fromUsedId: loggedInUser._id, status: "accepted" },
           ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate('toUserId', USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.status(200).json({data });
    } catch (error) {
        res.status(400).send("Error " + error.message);
    }
});

userRouter.get('/feed', userAuth, async (req, res) => {
   try {
       // user should see all the user cards except
       // 0. his own cards
       // 1. his connections
       // 2. ignored people
       // 3. already sent the connection request

       const loggedInUser = req.user;

       const page = parseInt(req.query.page) || 1;
       let limit = parseInt(req.query.limit) || 10;
       limit = limit > 50 ? 50 : limit;
       const skip = (page - 1) * limit;

       const connectionRequests = await ConnectionRequest.find({
          $or: [
              { fromUserId: loggedInUser._id },
              { toUserId: loggedInUser._id },
          ]
       })
           .select("fromUserId toUserId")
           .populate("fromUserId", "firstName")
           .populate("toUserId", "firstName");

       const hideUsersFromFeed = new Set();
       connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId);
            hideUsersFromFeed.add(request.toUserId);
       });

       const hiddenIds = Array.from(hideUsersFromFeed).map(user => user._id );

       const users = await User.find({
          $and: [
              { _id: { $nin: hiddenIds } },
              { _id: { $ne: loggedInUser._id }}
          ]
       }).select(USER_SAFE_DATA).skip(skip).limit(limit);

       res.json({ data: users });
   } catch (error) {
       res.status(400).json({message: 'Error: ' + error.message});
   }
});

module.exports = userRouter;
