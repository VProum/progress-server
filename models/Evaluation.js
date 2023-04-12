const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const evaluationSchema = new Schema({
    userId: { type: ObjectId, ref: 'User' },
    answerList: [{ type: ObjectId, ref: 'Answer' }],
}, { timestamps: true });

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
