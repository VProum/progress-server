const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema({
    competences : { type: String, required: true, unique: true },
    capacites: {type: String, required: true },
    questions: String,
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
