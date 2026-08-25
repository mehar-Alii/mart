import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName:{
    type: String,
    required: true,
    trim: true
  },
  lastName:{
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isActive:{
    type: Boolean,
    required: true, 
  },
  password:{
    type: String,
    required: [true, "password is required"],
    select: false
  },
  refreshToken:{
    type: String,
    select: false
  }
  // last login needed here
},
{
  timestamps: true
})

export const User = mongoose.model("User", userSchema)