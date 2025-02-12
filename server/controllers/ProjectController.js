import cloudinary from "cloudinary";
import Project from "../models/Project.js";
import fs from "fs";

export const AddProject = async (req, res) => {
  try {
    const { title, description, link, members, techs } = req.body;
    if (!title || !description || !link)
      return res.status(404).json({ error: "Some Data are Missing" });
    if (members.length === 0)
      return res
        .status(404)
        .json({ error: "The Project Has A Least One Member" });

    const file = req.file;
    if (!file)
      return res.status(404).json({ error: "The Member Should Have an Image" });
    const image = await cloudinary.v2.uploader.upload(file.path, {
      folder: "projects",
    });

    await fs.promises.unlink(file.path);
    const membersId = JSON.parse(members);
    const techsValues = JSON.parse(techs);
    const project = await Project.create({
      title,
      description,
      link,
      members: membersId,
      image,
      techs: techsValues,
    });

    res.status(200).json({ project });
  } catch (error) {
    console.error("Error in AddProject:", error);
    res.status(500).json({ error: error.message });
  }
};

export const DeleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project.thumbnail.public_id)
      await cloudinary.v2.uploader.destroy(project.thumbnail.public_id);
    if (project.video.public_id)
      await cloudinary.v2.uploader.destroy(project.video.public_id);
    await project.deleteOne();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetProjects = async (req, res) => {
  try {
    const { name, tags, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };

    if (tags) filter.tags = { $in: tags };

    const projects = await Project.find(filter)
      .skip(limit * (page - 1))
      .limit(limit)
      .populate("members", "firstName lastName image");

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate(
      "members",
      "firstName lastName image"
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
