const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getSingleAppointment,
} = require("../controllers/appointment");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/appointments/new-appointment")
  .post(authenticateUser, authorizePermissions("clerk"), createAppointment);

router
  .route("/appointments/:id")
  .get(authenticateUser, authorizePermissions("clerk"), getSingleAppointment);

module.exports = router;
