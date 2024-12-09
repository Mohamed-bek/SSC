import cloudinary from "cloudinary";
import Project from "../models/Project.js";
import fs from "fs";

export const AddProject = async (req, res) => {
  try {
    const { name, description, link, owner } = req.body;
    if (!name || !description || !link || !owner)
      return res.status(404).json({ error: "Some Data are Missing" });

    const videoFile = req.files.video[0] || null;
    const thumbnailFile = req.files.thumbnail[0] || null;

    if (!videoFile)
      return res.status(404).json({ error: "Video File Not Found" });
    if (!thumbnailFile)
      return res.status(404).json({ error: "Thumbnail File Not Found" });

    const thumbnail = await cloudinary.v2.uploader.upload(thumbnailFile.path, {
      folder: "ProjectThumbnails",
    });
    const video = await cloudinary.v2.uploader.upload(videoFile.path, {
      folder: "ProjectVideos",
      resource_type: "video",
    });

    await fs.promises.unlink(videoFile.path);
    await fs.promises.unlink(thumbnailFile.path);

    const project = await Project.create({
      name,
      description,
      link,
      owner,
      thumbnail,
      video,
    });

    res.status(200).json({ project });
  } catch (error) {
    console.error("Error in AddProject:", error); // Log the error message
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
      .limit(limit);

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
