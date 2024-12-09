import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    thumbnail: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    video: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    tags: [String],
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

export default Project;
