const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    issueID: {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;