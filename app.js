const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const doctors = ['Dr. Amith', 'Dr. Kishan', 'Dr. Ramya', 'Dr. Rashmi'];
const appointments = [];

// Helper function to find appointments by email or doctor
function findAppointmentByEmail(email) {
    return appointments.find(appointment => appointment.email === email);
}

function findAppointmentsByDoctor(doctorName) {
    return appointments.filter(appointment => appointment.doctor === doctorName);
}

// API 1: Appointment Booking API
app.post('/book', (req, res) => {
    const { firstName, lastName, email, timeSlot, doctor } = req.body;
    
    if (!doctors.includes(doctor)) {
        return res.status(400).send('Invalid doctor name');
    }

    const isSlotTaken = appointments.some(appointment => appointment.doctor === doctor && appointment.timeSlot === timeSlot);
    if (isSlotTaken) {
        return res.status(400).send('Time slot already booked');
    }

    const newAppointment = { firstName, lastName, email, timeSlot, doctor };
    appointments.push(newAppointment);

    res.status(201).json({
        message: 'Appointment booked successfully',
        appointment: newAppointment
    });
});

// API 2: View Appointment Details API
app.get('/appointment/:email', (req, res) => {
    const email = req.params.email;
    const appointment = findAppointmentByEmail(email);
    
    if (!appointment) {
        return res.status(404).send('No appointment found');
    }

    res.json(appointment);
});

// API 3: View all appointments for a specific doctor
app.get('/appointments/:doctor', (req, res) => {
    const doctor = req.params.doctor;
    
    if (!doctors.includes(doctor)) {
        return res.status(400).send('Invalid doctor name');
    }

    const doctorAppointments = findAppointmentsByDoctor(doctor);

    res.json(doctorAppointments);
});

// API 4: Cancel an appointment
app.delete('/cancel', (req, res) => {
    const { email, timeSlot } = req.body;
    const appointmentIndex = appointments.findIndex(
        appointment => appointment.email === email && appointment.timeSlot === timeSlot
    );

    if (appointmentIndex === -1) {
        return res.status(404).send('Appointment not found');
    }

    appointments.splice(appointmentIndex, 1);
    res.json({ message: 'Appointment cancelled successfully' });
});

// API 5: Modify an appointment
app.put('/modify', (req, res) => {
    const { email, originalTimeSlot, newTimeSlot } = req.body;
    
    const appointment = findAppointmentByEmail(email);
    
    if (!appointment || appointment.timeSlot !== originalTimeSlot) {
        return res.status(404).send('No matching appointment found');
    }

    const isSlotTaken = appointments.some(apt => apt.doctor === appointment.doctor && apt.timeSlot === newTimeSlot);
    if (isSlotTaken) {
        return res.status(400).send('New time slot is already booked');
    }

    appointment.timeSlot = newTimeSlot;

    res.json({
        message: 'Appointment modified successfully',
        appointment
    });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
