var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});
var File = mongoose.model("File", FileSchema);
module.exports = File;
