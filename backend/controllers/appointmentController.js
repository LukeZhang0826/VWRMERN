import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentModel.js'
import User from '../models/userModel.js'
// import requestEmail from '../email/requestEmail.js';
// import notifyEmail from '../email/notificationEmail.js'
import dotenv from 'dotenv';
dotenv.config();
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc    Create an appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
    const { name, email, phone, practitioner, service, type, scheduleTime, duration, price, message } = req.body;
    const formattedScheduleTime = new Date(scheduleTime); // Convert the scheduleTime string to a JavaScript Date

    const newAppointment = new Appointment({
        user: req.user._id,
        type,
        service,
        practitioner,
        name: name || req.user.name,
        email: email || req.user.email,
        phone: phone || req.user.phone,
        scheduleTime: formattedScheduleTime, // Use the formatted date here
        duration,
        price,
        message,
    });

    const appointment = await newAppointment.save();
    // Check if the appointment was saved
    if (appointment) {
        // Look up the user by id
        const user = await User.findById(req.user._id);

        // If the user exists, push the new appointment id to the appointments array
        if (user) {
            user.appointments.push(appointment._id);
            await user.save(); // Save the updated user
        } else {
            res.status(404);
            throw new Error('User not found');
        }

        // Send an email to the user
        // const sendRequestEmail = async () => {
        //     const msg = {
        //         to: appointment.email,
        //         from: 'vivarehab@gmail.com', // Your SendGrid registered email
        //         subject: 'Viva Wellness & Rehab Centre - Appointment Request', 
        //         text: 'Thank you for requesting!\nWe will get back to you as soon as possible.\n\n\nViva Welllness& Rehab Centre\n165 Sheppard Ave West\nNorth York, ON, M2N 1M9\n647-352-8688\nwww.vivawellnessrehab.com',
        //     };
          
        //     try {
        //         await sgMail.send(msg);
        //         console.log(appointment.email)
        //     } catch (error) {
        //         console.error("Error sending email:", error);
        //     }
        //   };

        // await requestEmail(
        //     appointment.email, 
        //     'Viva Wellness & Rehab Centre - Appointment Request', 
        //     'Thank you for requesting!\nWe will get back to you as soon as possible.\n\n\nViva Welllness& Rehab Centre\n165 Sheppard Ave West\nNorth York, ON, M2N 1M9\n647-352-8688\nwww.vivawellnessrehab.com'
        // );

        // const sendNotificationEmail = async () => {
        //     const msg = {
        //       to: 'vivarehab@gmail.com', // Your admin/notification email
        //       from: 'vivarehab@gmail.com', // Your SendGrid registered email
        //       subject: 'Viva Wellness & Rehab Centre - Appointment Request',
        //         text: `Appointment Request\n\nName: ${appointment.name}\nEmail: ${appointment.email}\nPhone: ${appointment.phone}\nPractitioner: ${appointment.practitioner}\nService: ${appointment.service}\nSchedule Time: ${appointment.scheduleTime}\nDuration: ${appointment.duration}\nPrice: ${appointment.price}\nMessage: ${appointment.message}\n\nAn email has already been sent to them, check the sent folder!\nDon't forget to update the admin scheduler!`,
        //     };
          
        //     try {
        //         await sgMail.send(msg);
        //         console.log('Email sent')
        //     } catch (error) {
        //         console.error("Error sending email:", error);
        //     }
        // };

        // sendRequestEmail();
        // sendNotificationEmail();

        const msg1 = {
            to: appointment.email,
            from: process.env.SENDER_EMAIL, // Your SendGrid registered email
            subject: 'Viva Wellness & Rehab Centre - Appointment Request', 
            text: 'Thank you for requesting!\nWe will get back to you as soon as possible.\n\n\nViva Welllness& Rehab Centre\n165 Sheppard Ave West\nNorth York, ON, M2N 1M9\n647-352-8688\nwww.vivawellnessrehab.com',
        };
        sgMail
        .send(msg1)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

        const msg2 = {
            to: process.env.NOTIFICATION_EMAIL, // Your admin/notification email
            from: process.env.SENDER_EMAIL, // Your SendGrid registered email
            subject: 'Viva Wellness & Rehab Centre - Appointment Request',
            text: `Appointment Request\n\nName: ${appointment.name}\nEmail: ${appointment.email}\nPhone: ${appointment.phone}\nPractitioner: ${appointment.practitioner}\nService: ${appointment.service}\nSchedule Time: ${appointment.scheduleTime}\nDuration: ${appointment.duration}\nPrice: ${appointment.price}\nMessage: ${appointment.message}\n\nAn email has already been sent to them, check the sent folder!\nDon't forget to update the admin scheduler!`,
        };

        sgMail
        .send(msg2)
        .then(() => {
            console.log('Notif email sent')
        })
        .catch((error) => {
            console.error(error)
        })

        // await notifyEmail(
        //     'Viva Wellness & Rehab Centre - Appointment Request',
        //     `Appointment Request\n\nName: ${appointment.name}\nEmail: ${appointment.email}\nPhone: ${appointment.phone}\nPractitioner: ${appointment.practitioner}\nService: ${appointment.service}\nSchedule Time: ${appointment.scheduleTime}\nDuration: ${appointment.duration}\nPrice: ${appointment.price}\nMessage: ${appointment.message}\n\nAn email has already been sent to them, check the sent folder!\nDon't forget to update the admin scheduler!`
        // );

        res.status(201).json(appointment);
    } else {
        res.status(400);
        throw new Error('Invalid appointment data');
    }
});

// @desc    Get an appointment
// @route   GET /api/appointments/:id
// @access  Private
const getAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        res.json(appointment);
    } else {
        res.status(404);
        throw new Error('Appointment not found');
    }
});

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
        appointment.type = req.body.type || appointment.type;
        appointment.service = req.body.service || appointment.service;
        appointment.practitioner = req.body.practitioner || appointment.practitioner;
        appointment.name = req.body.name || appointment.name;
        appointment.email = req.body.email || appointment.email;
        appointment.phone = req.body.phone || appointment.phone;
        appointment.scheduleTime = req.body.scheduleTime || appointment.scheduleTime;
        appointment.duration = req.body.duration || appointment.duration;
        appointment.price = req.body.price || appointment.price;
        appointment.message = req.body.message || appointment.message;

        const updatedAppointment = await appointment.save();

        res.status(200).json(updatedAppointment);
    } else {
        res.status(404);
        throw new Error('Appointment not found');
    }
});

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        await Appointment.deleteOne({ _id: appointment._id });
        
        // Find user and remove the appointment from user's appointments array
        const user = await User.findById(appointment.user);
        if (user) {
            const index = user.appointments.indexOf(appointment._id);
            if (index > -1) {
                user.appointments.splice(index, 1);
                await user.save();  // Save the updated user
            }
        }

        res.status(200).json({ message: 'Appointment removed' });
    } else {
        res.status(404);
        throw new Error('Appointment not found');
    }
});


// @desc    Get calendar appointments
// @route   GET /api/appointments/calendar
// @access  Private
const getCalendarAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ 
        type: 'Booking',
    });

    res.status(200).json(appointments);
});

// @desc    Get completed appointments
// @route   GET /api/appointments/completed
// @access  Admin
const getCompletedAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ 
        type: 'Completed'
     });

    res.status(200).json(appointments);
});

// @desc    Get pending appointments
// @route   GET /api/appointments/pending
// @access  Admin
const getPendingAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ 
        type: 'Request'
     });

    res.status(200).json(appointments);
});

// @desc    Get missed appointments
// @route   GET /api/appointments/missed
// @access  Admin
const getMissedAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ 
        type: 'NoShow',
    });
    res.status(200).json(appointments);
});

// @desc    Get Practitioner Availability
// @route   GET /api/appointments/availability
// @access  Admin
const getPractitionerAvailability = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ 
        type: 'Availability',
    });
    res.status(200).json(appointments);
});


export {
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    getCalendarAppointments,
    getCompletedAppointments,
    getPendingAppointments,
    getMissedAppointments,
    getPractitionerAvailability,
};