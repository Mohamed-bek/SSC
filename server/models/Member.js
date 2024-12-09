import { Schema, model } from "mongoose";

const memberSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      default: null,
      sparse: true,
    },
    description: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  {
    timestamps: true,
  }
);

const Member = model("Member", memberSchema);
export default Member;
