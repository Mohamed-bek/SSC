import Registration from "../models/Registration.js";

export const MakeRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, event } = req.body;
    const registration = await Registration.create({
      firstName,
      lastName,
      email,
      event,
    });
    if (!registration)
      return res.status(400).json({ error: "Failed To Create Registration " });
    res.status(200).json({ message: "Registration Succeded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
