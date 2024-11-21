import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

// Define the User schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false, // Name is mandatory
      trim: true, // Removes whitespace from the beginning and end
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same email
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Regex for email validation
    },
    phone: {
      type: String,
      required: false,
      match: [/^\d{10}$/, 'Invalid phone number'], // Regex for phone number validation
    },
    country: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true, // Password is mandatory
      minlength: 6, // Enforces a minimum password length
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Role can only be 'user' or 'admin'
      default: 'user',
    },
    profilePic: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware to update the `updatedAt` field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = model('User', userSchema);
export default User;
