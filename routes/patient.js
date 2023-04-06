const express = require("express");

const router = express.Router();

const {
  registerPatient,
  getSinglePatient,
  getAllPatients,
  editPatientProfile,
  deletePatient,
} = require("../controllers/patient");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/patients/register")
  .post(authenticateUser, authorizePermissions("clerk"), registerPatient);

router
  .route("/patients/:patient_id")
  .patch(authenticateUser, authorizePermissions("clerk"), editPatientProfile)
  .get(authenticateUser, authorizePermissions("clerk"), getSinglePatient)
  .delete(authenticateUser, authorizePermissions("clerk"), deletePatient);

router
  .route("/patients")
  .get(authenticateUser, authorizePermissions("clerk"), getAllPatients);

module.exports = router;
