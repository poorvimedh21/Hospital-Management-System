const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const doctors = [
  { id: 1, name: "Dr. Amit Sharma", specialization: "Cardiologist" },
  { id: 2, name: "Dr. Neha Patel", specialization: "Dermatologist" },
  { id: 3, name: "Dr. Raj Mehta", specialization: "Orthopedic" }
];

app.get("/", (req, res) => {
  res.render("home", {
    title: "Hospital Management System",
    doctors: doctors
  });
});

app.get("/doctors", (req, res) => {
  res.render("home", {
    title: "Available Doctors",
    doctors: doctors
  });
});

app.get("/doctor/:id", (req, res) => {
  const doctor = doctors.find(d => d.id == req.params.id);

  if (!doctor) {
    return res.status(404).send("Doctor Not Found");
  }

  res.send(`
    <h2>${doctor.name}</h2>
    <p>Specialization: ${doctor.specialization}</p>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
