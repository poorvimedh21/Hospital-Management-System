const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("hbs", exphbs.engine({
  extname: ".hbs"
}));

app.set("view engine", "hbs");
app.set("views", "./views");

const doctors = [
  { id: 1, name: "Dr. Sharma", department: "Cardiology" },
  { id: 2, name: "Dr. Mehta", department: "Neurology" }
];

const appointments = [
  { patient: "Rahul", doctor: "Dr. Sharma", date: "20 Sept 2026" },
  { patient: "Priya", doctor: "Dr. Mehta", date: "22 Sept 2026" }
];

app.get("/", (req, res) => {
  res.render("home", { title: "Hospital Management System" });
});

app.get("/doctors", (req, res) => {
  res.render("doctors", { doctors });
});

app.get("/doctor/:id", (req, res) => {
  const doctor = doctors.find(d => d.id == req.params.id);
  if (!doctor) return res.status(404).send("Doctor Not Found");
  res.render("doctor", { doctor });
});

app.get("/appointments", (req, res) => {
  res.render("appointments", { appointments });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
