import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js';

//register user
const registerUser = asyncHandler(async (req,res) => {
    // get user details from frontend
    // validation - image & avatar validation through middleware
    // check is user already exist: username/email
    // check for images and avatar
    // upload images in cloudinary, check avatar uploaded
    // create user object - create entry in db
    // remove poassword and refresToken field from response
    // check for user creation
    // return res

    //--------------------------------------------
    const {fullname, email, username, password} = req.body

    // console.log(req.body);
    // console.log('----------');
    // console.log(req.files);
    // console.log("email - ", email);
    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are requierd")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existingUser){
        throw new ApiError(409, "email or username already exist")
    }

    //------------------------------------------------
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0].path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar is required");
    }

    //----------------------------------------------------
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })
    const createdUser = await User.findById(user).select(
        "-password -refreshToken"
    )
    if(!createdUser) {
        throw new ApiError(500,"something went wrong while registering user")
    }

    //--------------------------------------------------------
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export {
    registerUser,
}