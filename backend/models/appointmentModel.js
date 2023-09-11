import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User', // This associates the User model with the Appointment model
    },
    type: {
        type: String,
        required: true,
        enum: [
            'Request', // this is for unconfirmed appointments
            'Booking', // this is for confirmed appointments
            'Completed', // this is for completed appointments
            'NoShow', // this is for no show appointments
            'Availability', // this is for practitioner availability
        ]
    },
    practitioner: {
        type: String,
        default: 'N/A',
        required: true,
        enum: [
            'N/A',

            'Wei Guan', 
            'Julie Zhu', 
            'Shaoying Huang',
            'Shuqin Xiong',
            'Yiyang Huang',
            'Jeffery Cheng',

            'Wendy Wen',

            'Zhifeng Zhang',

            'Linhan Zhang',

            'Mark Train',
            'Alexander Kipershlak'        
        ],
    },
    service: {
        type: String,
        required: true,
        enum: [
            'N/A',
            'RMT Massage - Aromatherapy', 
            'RMT Massage - Deep Tissue', 
            'RMT Massage - Hot Stone', 
            'RMT Massage - Lymphatic Drainage', 
            'RMT Massage - Swedish', 
            'Acupuncture - Initial Assessment', 
            'Acupuncture - Follow Up', 
            'Chiropractic - Initial Assessment', 
            'Chiropractic - Follow Up', 
            'Physiotherapy - Initial Assessment', 
            'Physiotherapy - Follow Up', 
            'Facial - Hydrating', 
            'Facial - Deep Cleaning'
        ],
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String, // This is not required because the user may not have a phone number
    },
    scheduleTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    message: {
        type: String, // This is not required because the user may not have a message
    },
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;