const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema({
    competences : { type: String, required: true, unique: true },
    capacites: {type: String, required: true },
    questions: String,
    isLive: Boolean,
    displayOrder: { type: Number, required: true, unique: true },
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
