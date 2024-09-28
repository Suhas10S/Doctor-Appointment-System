Requirements: 

1. Code must be published in GitHub with a link we can access (use public repo).

2. Code must compile with some effort on unit tests, doesn't have to be 100%, but it shouldn't be 0%.

3. Please code this with NodeJS.

4. Adding a persistence layer will be cumbersome, so just store the data in your current session/in memory.

App to be coded:

Background: All API referenced are REST APIs.
We are building a simple Doctor Appointment Booking System.

Users (patients) should be able to book an appointment with a doctor. Each doctor has a limited number of appointment slots.

Appointment Booking API:

Create an API that allows a user to book an appointment with a doctor.
The appointment should include:
Patient details: First name, Last name, Email
Appointment time slot (in a simple format, e.g., "10:00 AM - 11:00 AM")
Doctor's name (predefined)
The API should return a confirmation of the booking with the appointment details.
 

View Appointment Details API:

Create an API to show the details of a booked appointment for a patient.
Input: Patient's email address.
Output: Appointment details, including the doctor's name, time slot, and patient information.
 

View All Appointments by Doctor API:

Create an API to list all booked appointments for a specific doctor.
Input: Doctor's name.
Output: List of all appointments for the doctor, including time slots and patient details.
Cancel Appointment API:

Create an API that allows a user to cancel their appointment.
Input: Patient's email and appointment time slot.
Output: Confirmation that the appointment has been cancelled.
Modify Appointment API:

Create an API that allows a user to modify the time slot of an already booked appointment.
Input: Patient's email, original time slot, and new time slot.
Output: Updated appointment details.