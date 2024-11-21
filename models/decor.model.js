import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the User schema
const decorSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Removes whitespace from the beginning and end
    },
    arFileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    colors: {
      type: [
        {
          color: {
            type: String,
            required: true,
            trim: true,
          },
          imageUrl: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
decorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the User model
const Decor = model("Decor", decorSchema);

export default Decor;
