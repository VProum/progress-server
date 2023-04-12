const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const answerSchema = new Schema({
    questionId: { type: ObjectId, ref: 'Question' },
    repartition: Number,
    reponse: Number,
}, { timestamps: true });

const Answer = mongoose.model("Answer", userSchema);

module.exports = Answer;
