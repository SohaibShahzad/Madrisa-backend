const { default: mongoose, Mongoose } = require("mongoose");
const { Schema } = mongoose;

const SalariesSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    month: {
      type: String,
    },
    teacherID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

const Salaries = mongoose.model("Salaries", SalariesSchema);
module.exports = Salaries;
