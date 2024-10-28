const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));
app.get('/addPatient', (req, res) => res.sendFile(path.join(__dirname, '/views/addPatient.html')));
app.get('/addDoctor', (req, res) => res.sendFile(path.join(__dirname, '/views/addDoctor.html')));
app.get('/addVaccination', (req, res) => res.sendFile(path.join(__dirname, '/views/addVaccination.html')));
app.get('/vaccinationStatus', (req, res) => res.sendFile(path.join(__dirname, '/views/vaccinationStatus.html')));

// Add a new patient
app.post('/addPatient', (req, res) => {
  const { name, dob, phone, houseNo, streetNo, streetName, city, postalCode, state } = req.body;
  const sql = 'INSERT INTO Patient (patient_name, patient_dob, patient_phone, patient_houseNo, patient_streetNo, patient_streetName, patient_city, patient_postalCode, patient_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, dob, phone, houseNo, streetNo, streetName, city, postalCode, state], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Add a new doctor
app.post('/addDoctor', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO Doctor (doctor_name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Add a new vaccination
app.post('/addVaccination', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO Vaccination (vaccine_name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Record vaccination status
app.post('/vaccinationStatus', (req, res) => {
  const { patient_id, doctor_id, vaccine_id, vaccine_name, date, completed } = req.body;
  const sql = 'INSERT INTO Vaccination_Status (patient_id, doctor_id, vaccine_id, vaccine_name, date, completed) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [patient_id, doctor_id, vaccine_id, vaccine_name, date, completed], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
