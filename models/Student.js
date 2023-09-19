const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
// const getNextSequenceValue = require("../middleware/counter");

const StudentSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    rollNo: {
      type: Number,
    },
    dob: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
  }
);

StudentSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
