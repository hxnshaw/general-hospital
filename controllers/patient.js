const { Patient } = require("../models");
//const wrap = require("express-async-wrap");

exports.registerPatient = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    birthDate,
    gender,
    telephone_number,
    payment_category,
  } = req.body;

  console.log(req.body);

  try {
    const patientAlreadyExists = await Patient.findOne({
      where: { telephone_number: telephone_number },
    });
    if (patientAlreadyExists) {
      return res
        .status(400)
        .json({ message: "This number is registered to a patient" });
    }
    const patient = await Patient.create({
      first_name,
      middle_name,
      last_name,
      birthDate,
      gender,
      telephone_number,
      payment_category,
    });

    return res.status(201).json({
      message: `${patient.first_name} ${patient.middle_name} ${patient.last_name}, with id: ${patient.patient_id} registered successfully`,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.getSinglePatient = async (req, res) => {
  const { patient_id: patient_id } = req.params;

  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
      include: ["appointment"],
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({ data: patient });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({});
    if (patients.length === 0) {
      return res.status(404).json({ message: "No patients found." });
    }

    return res.status(200).json({ users: patients.length, data: { patients } });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.editPatientProfile = async (req, res) => {
  const { patient_id: patient_id } = req.params;
  const {
    last_name,
    first_name,
    middle_name,
    birthDate,
    gender,
    telephone_number,
    payment_category,
  } = req.body;
  try {
    if (
      !last_name ||
      !first_name ||
      !middle_name ||
      !birthDate ||
      !gender ||
      !telephone_number ||
      !payment_category
    ) {
      res.status(400).json({ message: "Please enter valid credentials" });
    }

    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
    });
    if (!patient) {
      return res.status(404).json({ message: "patient not found " });
    }
    (patient.last_name = last_name),
      (patient.first_name = first_name),
      (patient.middle_name = middle_name),
      (patient.birthDate = birthDate),
      (patient.gender = gender),
      (patient.telephone_number = telephone_number),
      (patient.payment_category = payment_category),
      await patient.save();

    return res.status(200).json({ profile: patient });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.deletePatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
    });

    await patient.destroy();
    return res.status(200).json({ msg: "Patient Deleted" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
