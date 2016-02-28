const mongoose = require('modules/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    videoId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    parsedItems: {
        type: Schema.Types.Mixed,
        default: []
    }
});

module.exports = mongoose.model('VideoCache', schema);