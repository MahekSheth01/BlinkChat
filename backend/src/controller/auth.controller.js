import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from "jsonwebtoken";

export async function signup(req,res){

    const {fullName, email, password} = req.body;
    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fileds are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters long "})
        }
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already in use"});
        }

        const idx=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`

        const newUser=await User.create({
            email,
            fullName,
            password,
            profilePic:randomAvatar
        })

        try{
            await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic || ""
        })
        console.log( `Stream user created for ${newUser.fullName}`);
        }
        catch(err){
            console.log("Error creating Stream user:",err)
        }

        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production",
        })

        res.status(201).json({
            success:true,
            user:newUser
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Error in signup"})
        
    }
}

export async function login(req,res){
    try{
        const {email,password}=req.body;
        
        if(!email  || !password){
            return res.status(400).json({message:"Email and password are required"})
        }
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid email or password"})

        const isPasswordCorrect=await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({
            message:"Invalid email or  password"
        })

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production",
        })

        res.status(201).json({
            success:true,
            user
        })
    }
    catch(error){

    }
}

export async function logout(req,res){
    res.clearCookie("jwt")
    res.status(200).json({success:true,message:"Logged out successfully"})
}
export async function onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        // Check for missing fields
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            });
        }

       
        
        // Update user info
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                bio,
                nativeLanguage,
                learningLanguage,
                location,
                isOnboarded: true
            },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

         //Update in streamm
        
        try{
            await upsertStreamUser({
                id:updateUser._id.toString(),
                name:updateUser.fullName,
                image:updateUser.profilePic || ""
            })
            console.log(`Stream user updated for user ${updateUser.fullName}`)
        }
        catch(streamError){
            console.error(streamError)
            return res.status(500).json({ message: "Error updating user info" });
        }
        // ✅ Send success response
        return res.status(200).json({
            message: "User onboarded successfully",
            user: updateUser
        });

    } catch (error) {
        console.error("Onboarding error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
