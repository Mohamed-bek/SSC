import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { generateTokens } from "../utilitis/tokens.js";
import cloudinary from "cloudinary";
import Visitor from "../models/Visitor.js";
import Member from "../models/Member.js";
import Participant from "../models/Participant.js";
import Project from "../models/Project.js";
import Event from "../models/Event.js";
import jwt from "jsonwebtoken";
import generateMonthlyData from "../utilitis/Analytics.js";

export const AddAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!newAdmin) {
      return res.status(400).json({ message: "User creation failed" });
    }

    res.status(200).json({ admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Email Dosen't exist" });
    }
    if (!(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(admin);
    admin.refreshToken = refreshToken;
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", admin, accessToken });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const RefreshToken = (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ error: "The Resfresh Not Found" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, adminData) => {
        if (err) return res.status(403).json({ error: err });
        const adminId = adminData.id;
        const admin = await Admin.findById(adminId);
        if (!admin || admin.refreshToken !== refreshToken)
          return res
            .status(403)
            .json({ error: "The Refresh Token Is Not Like IN DB" });

        const newTokens = generateTokens(admin);

        admin.refreshToken = newTokens.refreshToken;
        await admin.save();

        res.cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          sameSite: "Lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          message: "Refresh token Succeeded",
          admin,
          accessToken: newTokens.accessToken,
        });
      }
    );
  } catch (error) {
    res.status(error.status || 400).json({ err: error.message });
  }
};

export const LogOut = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      res.cookie("refreshToken", "", {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: -1,
        expires: new Date(0),
      });
      await Admin.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }
    res.status(204).json({ message: "Log Out Successfully" });
  } catch (error) {
    res.status(error.status || 404).json({ err: error.message });
  }
};

export const UpdateAvatar = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    if (admin.image.public_id) {
      await cloudinary.v2.uploader.destroy(admin.image.public_id);
    }
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      file,
      {
        folder: "AdminsImages",
      }
    );

    // Update user image with new location
    admin.image = {
      secure_url,
      public_id,
    };
    await admin.save();

    res.status(200).json({ message: "Upload Success" });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const GetData = async (req, res) => {
  try {
    const [visitors, members, participants, projects, events] =
      await Promise.all([
        Visitor.countDocuments(),
        Member.countDocuments(),
        Participant.countDocuments(),
        Project.countDocuments(),
        Event.countDocuments(),
      ]);
    res.status(200).json({ visitors, members, participants, projects, events });
  } catch (error) {
    res.status({ message: "Faild To Get Data", err: error.message });
  }
};

export const GetAnalytics = async (req, res) => {
  try {
    const data = await generateMonthlyData(Member, 6);
    res.status(200).json({ ...data });
  } catch (error) {
    res.status({ message: "Faild To Get Data", err: error.message });
  }
};
