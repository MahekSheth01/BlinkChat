import express from 'express';
import {getOutgoingFriendReqs,getFriendRequests, acceptFriendRequest,getMyFriends, getRecommendedUsers,sendFriendRequest } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

//Apply auth Middleware to all routes
router.use(protectRoute)

router.get("/",getRecommendedUsers)

router.get("/friends",getMyFriends)

router.post("/friend-request/:id" ,sendFriendRequest)

router.put("/friend-request/:id/accept",acceptFriendRequest)

router.get("/friend-requests",getFriendRequests)

router.get("/outgoing-friend-requests",getOutgoingFriendReqs);

export default router;
