import { Schema, model } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
    co_leader: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
    members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  },
  { timestamps: true }
);

const Department = model("Department", departmentSchema);

export default Department;
