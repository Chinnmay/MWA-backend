const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    issueID: {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
}, {timestamps: true });

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;