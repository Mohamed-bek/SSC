import Event from "../models/Event.js";
import cloudinary from "cloudinary";
export const CreateEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate, speakers } =
      req.body;
    const files = req.files;

    // Validation checks
    if (!title) {
      return res.status(400).json({ error: "Event name is required" });
    }

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    if (!startDate) {
      return res.status(400).json({ error: "Start date is required" });
    }

    const mainFile = req.files["file"][0];
    if (!mainFile) {
      return res.status(400).json({ error: "Event Must Have An Image" });
    }

    // Upload main image
    const { secure_url } = await cloudinary.v2.uploader.upload(mainFile.path, {
      folder: "events",
    });

    // Process speakers
    const processedSpeakers = [];

    // Check if speakers exist and is an array
    if (speakers && Array.isArray(speakers)) {
      for (let i = 0; i < speakers.length; i++) {
        const speaker = JSON.parse(speakers[i]); // Assuming speakers are sent as stringified JSON

        // Prepare speaker data
        const speakerData = {
          firstName: speaker.firstName || "",
          lastName: speaker.lastName || "",
          image: null,
        };
        // Check if speaker image exists
        if (files.speakerImages && files.speakerImages[i]) {
          const { secure_url } = await cloudinary.v2.uploader.upload(
            files.speakerImages[i].path,
            {
              folder: "speakers",
            }
          );
          speakerData.image = secure_url;
        }

        processedSpeakers.push(speakerData);
      }
    }

    const event = await Event.create({
      title,
      description,
      location,
      date: {
        start: startDate,
        end: endDate,
      },
      image: secure_url,
      speakers: processedSpeakers,
    });

    if (!event) {
      return res.status(500).json({
        message: "Failed to create event",
      });
    }

    // Successful response
    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};

export const GetEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
