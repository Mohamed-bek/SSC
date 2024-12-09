import fs from "fs";
import Department from "../models/Department.js";
import cloudinary from "cloudinary";
import Member from "../models/Member.js";

export const AddDepartment = async (req, res) => {
  try {
    const { name, description, leader, co_leader } = req.body;
    if (!name || !description || !leader || !co_leader)
      return res.status(400).json({ error: "Data is Missing" });
    const imageFile = req.file;
    if (!imageFile)
      return res.status(400).json({ error: "Image Of Department Is Missing" });
    const image = await cloudinary.v2.uploader.upload(imageFile.path, {
      folder: "Department",
    });
    const department = await Department.create({
      name,
      description,
      leader,
      co_leader,
      members: [],
      image,
    });
    await fs.promises.unlink(imageFile.path);
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ChangeLeaderAndCoLeader = async (req, res) => {
  try {
    const { newLeaderId, newCoLeaderId } = req.body;
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);
    if (newCoLeaderId) department.co_leader = newCoLeaderId;
    if (newLeaderId) department.leader = newLeaderId;
    await department.save();
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const AddMembers = async (req, res) => {
  try {
    const { departmentId } = req.id;
    const { members } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const existingMembers = await Department.find({
      members: { $in: members },
    });

    const membersToAdd = members.filter(
      (member) =>
        !existingMembers.some((existingDepartment) =>
          existingDepartment.members.includes(member)
        )
    );

    department.members.push(...membersToAdd);
    await department.save();

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const RemoveMember = async (req, res) => {
  try {
    const { departmentId } = req.id;
    const { memberId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const memberIndex = department.members.indexOf(memberId);
    if (memberIndex === -1) {
      return res
        .status(404)
        .json({ error: "Member not found in this department" });
    }

    department.members.splice(memberIndex, 1);

    if (department.co_leader === memberId) {
      department.co_leader = null;
    }
    if (department.leader === memberId) {
      department.leader = null;
    }

    await department.save();

    res
      .status(200)
      .json({ message: "Member removed successfully", department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
