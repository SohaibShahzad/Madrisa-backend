const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const FeeSchema = new Schema({
  amount: {
    type: Number,
  },
  month: {
    type: String,
  },
  datePaid: {
    type: Date,
  },
});

const StudentSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    rollNo: {
      type: Number,
    },
    grade: {
      type: String,
    },
    section: {
      type: String,
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
    fees: [FeeSchema],
    // subjects: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Subject",
    //   },
    // ],
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
