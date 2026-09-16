const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Hospital Management System");
});

router.get("/patients", (req, res) => {
  res.send("Patients List");
});

router.get("/doctors", (req, res) => {
  res.send("Doctors List");
});

module.exports = router;
