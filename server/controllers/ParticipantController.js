import Participant from "../models/Participant.js";
import cloudinary from "cloudinary";
import path from "path";
import ejs from "ejs";
import fs from "fs";
import { transporter } from "../utilitis/sendMail.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const AddParticipant = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, description } = req.body;
    const file = req.file;
    if (!file)
      return res.status(404).json({ error: "The Member Should Have an Image" });
    const { secure_url } = await cloudinary.v2.uploader.upload(file.path, {
      folder: "courses",
    });
    if (!secure_url)
      return res
        .status(404)
        .json({ error: "Fail To Upload Image To Cloudinary" });

    const participant = await Participant.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      description,
      image: secure_url,
    });
    await fs.promises.unlink(file.path);
    const template = fs.readFileSync(
      path.join(__dirname, "../mail/Congratulation.ejs"),
      "utf8"
    );

    const html = ejs.render(template, {
      username: participant.firstName + " " + participant.lastName,
    });

    await transporter.sendMail({
      from: `SCC <Start Coding Club>`,
      to: participant.email,
      subject: `Your Request To Become a Member of Start Coding Club is Being Processed`,
      html,
    });
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const GetParticipants = async (req, res) => {
  try {
    const { limit = 10, page = 1, status } = req.query;
    let filter = {};
    if (status) filter.status = status;
    const participants = await Participant.find(filter)
      .skip(limit * (page - 1))
      .limit(limit);
    res.status(200).json({ participants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ParticipantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const participant = await Participant.findById(id);
    participant.status = status;
    await participant.save();
    res.status(200).json({ participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
