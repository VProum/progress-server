const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  schoolClass: String,
  isTeacher: Boolean,
  currentEvaluation: {
    isOpen: {
      type: Boolean,
      default: false
    },
    evaluationTitle: {
      type: String,
      default: ""
    }
  },
  evaluationList: [{ type: ObjectId, ref: 'Evaluation' }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
