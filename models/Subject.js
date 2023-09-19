const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
