const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
  
const userSchema = new Schema({
  email: { type: String, required: true },
  profileImg: String,
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  schoolClass: String,
  isTeacher: Boolean,
  evaluationList: [{type: ObjectId, ref: 'Evaluation'}],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
