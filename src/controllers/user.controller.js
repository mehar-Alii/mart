import { asyncHandler } from '../utils/asynchandler.js';
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { registerUserSchema } from '../validator/user.validator.js';
import { User } from '../models/user.model.js'

function generateAccessRefreshToken () {

}

const registerUser = asyncHandler( async (res, req) => {

  const result = registerUserSchema.safeParse(req.body);

  if(!result.success){
    throw new ApiError(400,"Invalid user data");
  }

  if(result.data.firstName === result.data.lastName){
    throw new ApiError(400,"first and last name can not be same");
  }

  const userData = result.data;
  console.log(userData)

  const existingUser = await User.findOne({ email: userData.email}); // we could have use the or? operator if we want ot find the both fields

  if(existingUser){
    throw new ApiError(400,"user already exists");
  }

  const user = await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password
  })
  console.log(user)

  const userCreated  = await User.findById(user._id)

  console.log(userCreated)

  if(!userCreated){
    throw new ApiError(404, "user created !!! went wrong")
  }

  return res.status(201).json(
    new ApiResponse(201, userCreated, "user created successfuly")
  )

})

const testRequest = asyncHandler(async (res, req) => {
    console.log("========== REQUEST ==========");

    // 1. HTTP method
    console.log("METHOD:", req.method);

    // 2. URL
    console.log("URL:", req.url);

    // 3. Original URL
    console.log("ORIGINAL URL:", req.originalUrl);

    // 4. Route parameters
    console.log("PARAMS:", req.params);

    // 5. Query parameters
    console.log("QUERY:", req.query);

    // 6. Request body
    console.log("BODY:", req.body);

    // 7. Headers
    console.log("HEADERS:", req.headers);

    // 8. IP address
    console.log("IP:", req.ip);

    // 9. Content type
    console.log("CONTENT TYPE:", req.get("Content-Type"));

    // 10. Authorization header
    console.log("AUTHORIZATION:", req.get("Authorization"));

    console.log("==============================");

  res.status(200).json(
    {message: "ok"}
  )
});

export {registerUser , testRequest}