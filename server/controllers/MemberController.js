import cloudinary from "cloudinary";
import Member from "../models/Member.js";
import path from "path";
import ejs from "ejs";
import fs from "fs";
import { transporter } from "../utilitis/sendMail.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const AddMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      description,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      work,
      department,
    } = req.body;
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
    const member = await Member.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      description,
      image: secure_url,
      work,
      media: {
        linkedin: linkedinUrl,
        github: githubUrl,
        portfolio: portfolioUrl,
      },
      department,
    });
    await fs.promises.unlink(file.path);
    const template = fs.readFileSync(
      path.join(__dirname, "../mail/Congratulation.ejs"),
      "utf8"
    );

    const html = ejs.render(template, {
      username: member.firstName + " " + member.lastName,
    });

    await transporter.sendMail({
      from: `SCC <Start Coding Club>`,
      to: member.email,
      subject: `Congratulations! You Become a Member of Start Coding Club`,
      html,
    });

    res.status(200).json({ message: "Success!", member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetMembers = async (req, res) => {
  try {
    const { firstName, lastName, department, limit = 10, page = 1 } = req.query;
    let filter = {};
    if (department) {
      filter.department = department;
    }
    if (firstName) {
      filter.$or = [
        { firstName: { $regex: firstName, $options: "i" } },
        { lastName: { $regex: firstName, $options: "i" } },
      ];
    }

    if (lastName) {
      filter.$or = [
        { firstName: { $regex: lastName, $options: "i" } },
        { lastName: { $regex: lastName, $options: "i" } },
      ];
    }

    const members = await Member.find(filter)
      .skip(limit * (page - 1))
      .limit(limit)
      .populate({
        path: "department",
        select: "name",
      });
    const NbOfMembers = await Member.countDocuments(filter);

    res
      .status(200)
      .json({ members, NbOfPages: Math.ceil(NbOfMembers / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateMember = async (req, res) => {
  try {
    const info = req.body;
    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(id, info, {
      new: true,
    });
    if (!member) return res.status(404).json({ error: "The Member Not found" });
    res.status(200).json({ message: "Success!", member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);
    if (!member) return res.status(404).json({ error: "The Member Not found" });
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
