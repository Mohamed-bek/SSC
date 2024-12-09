import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import { generateTokens } from "../utilitis/tokens.js";
import cloudinary from "cloudinary";

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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const RefreshToken = (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, adminData) => {
        if (err) return res.sendStatus(403);
        console.log("the user : ", adminData);
        const adminId = adminData.id;

        const admin = await Admin.findById(adminId);
        if (!admin || admin.refreshToken !== refreshToken)
          return res.sendStatus(403);

        const newTokens = generateTokens(admin);
        admin.refreshToken = newTokens.refreshToken;

        await admin.save();
        res.cookie("accessToken", newTokens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ message: "Refresh token Succeeded" });
      }
    );
  } catch (error) {
    res.status(error.status || 400).json({ err: error.message });
  }
};

export const LogOut = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.sendStatus(401);

    await Admin.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken: "" } }
    );

    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      expires: new Date(0),
    });

    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      expires: new Date(0),
    });

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
