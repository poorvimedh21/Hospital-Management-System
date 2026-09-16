const http = require("http");
const url = require("url");

const doctors = [
  { id: 1, name: "Dr. Sharma", department: "Cardiology" },
  { id: 2, name: "Dr. Mehta", department: "Neurology" }
];

const appointments = [
  { patient: "Rahul", doctor: "Dr. Sharma", date: "20 Sept 2026" },
  { patient: "Priya", doctor: "Dr. Mehta", date: "22 Sept 2026" }
];

const patients = [
  { id: 1, name: "Rahul", age: 24, doctor: "Dr. Sharma" },
  { id: 2, name: "Priya", age: 21, doctor: "Dr. Mehta" }
];

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;

  res.writeHead(200, { "Content-Type": "text/html" });

  if (path === "/") {
    res.end("<h1>Hospital Management System</h1><p>Welcome to Hospital Home</p>");
  }

  else if (path === "/doctors") {
    let html = "<h1>Doctors</h1><ul>";
    doctors.forEach(d => {
      html += `<li>${d.name} - ${d.department}</li>`;
    });
    html += "</ul>";
    res.end(html);
  }

  else if (path.startsWith("/doctor/")) {
    const id = parseInt(path.split("/")[2]);
    const doctor = doctors.find(d => d.id === id);

    if (doctor) {
      res.end(`<h1>${doctor.name}</h1><p>Department: ${doctor.department}</p>`);
    } else {
      res.writeHead(404);
      res.end("<h1>Doctor Not Found</h1>");
    }
  }

  else if (path === "/appointments") {
    let html = "<h1>Appointments</h1><ul>";
    appointments.forEach(a => {
      html += `<li>${a.patient} - ${a.doctor} - ${a.date}</li>`;
    });
    html += "</ul>";
    res.end(html);
  }

  else if (path.startsWith("/patient/")) {
    const id = parseInt(path.split("/")[2]);
    const patient = patients.find(p => p.id === id);

    if (patient) {
      res.end(`<h1>${patient.name}</h1><p>Age: ${patient.age}</p><p>Doctor: ${patient.doctor}</p>`);
    } else {
      res.writeHead(404);
      res.end("<h1>Patient Not Found</h1>");
    }
  }

  else {
    res.writeHead(404);
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
