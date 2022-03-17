const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/Games", {
    useNewUrlParser:true
});

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    genre: {
        type: String,
        required: true,
        minlength: 1
    },
    hoursPlayed: {
        type: Number,
        required: true,
        minlength: 1
    }
});

module.exports = mongoose.model("Games", gameSchema)