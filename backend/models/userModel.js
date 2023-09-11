import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    requestedAppointment: {
        type: Boolean,
        default: false,
    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment',
        }
    ],
    forms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Form',
        }
    ],
    invoices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice',
        }
    ],
    notes: [
        {
            type: String,
        }
    ],
    conditions: [
        {
            type: String,
        }
    ],
    injuries: [
        {
            type: String,
        }
    ],
    medications: [
        {
            type: String,
        }
    ],
    surgeries: [
        {
            type: String,
        }
    ],
    tags: [
        {
            type: String,
            enum: ['RMT Massage', 'Acupuncture', 'Chiropractic', 'Physiotherapy', 'Facial', 'MVA'],
        }
    ],
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    // Hashes password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;