const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    whatsappNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: ['operator','admin'],
        default: 'operator',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, {timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;