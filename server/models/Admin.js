import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "The First Name Must be Provided"],
    },
    lastName: {
      type: String,
      required: [true, "The Last Name Must be Provided"],
    },
    email: {
      type: String,
      required: [true, "The Email Must be Provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The Password Must be Provided"],
    },
    refreshToken: {
      type: String,
    },
    image: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

AdminSchema.methods.hashPassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const Admin = model("Admin", AdminSchema);

export default Admin;
