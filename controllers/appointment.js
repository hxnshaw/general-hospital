const { Appointment, Patient } = require("../models");

exports.createAppointment = async (req, res) => {
  const { patient_name, medical_concern, date, patient_id } = req.body;
  try {
    if (!patient_name || !medical_concern || !date || !patient_id) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const appointment = await Appointment.create({
      patient_name,
      medical_concern,
      date,
      patient_id,
    });
    return res.status(201).json({ data: appointment });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getSingleAppointment = async (req, res) => {
  const appointment_id = req.params.id;
  try {
    const appointment = await Appointment.findOne({
      where: { id: appointment_id },
      include: ["patient"],
    });
    console.log(appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res.status(200).json({ data: appointment });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
