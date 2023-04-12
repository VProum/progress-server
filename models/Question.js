const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema({
    competences : String,
    capacites: String,
    questions: String,
}, { timestamps: true });

const Question = mongoose.model("Question", userSchema);

module.exports = Question;
