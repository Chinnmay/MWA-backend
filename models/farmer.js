const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    whatsappNumber: {
        type: String,
    },
    townVillage: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landAcreage: {
        type: String
    },
    previousCropsCultivated: {
        type: String,
    },
    currentCropsCultivated: {
        type: String,
    },
    soilTestingStatus: {
        type: String,
        required: true,
        enum: ['Done','Not Done'],
        default: 'Not Done'
    },
    lastSoilTestOn: {
        type: String,
        default: 'Never'
    },
    existingCustomer: {
        type: String,
        required: true,
        enum: ['Yes','No'],
        default: 'No'
    },
    usingProductsSince: {
        type: String,
        default: 'Never'
    },
    paid: {
        type: String,
        required: true,
        enum: ['Yes','No'],
        default: 'No'
    },
    status:{
        type: String,
        required: true,
        enum: ['Active','Inactive'],
        default: 'Active'
    },
    issues: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ]
}, {timestamps: true });

const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;