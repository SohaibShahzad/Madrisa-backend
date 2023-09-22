const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const EducationSchema = new Schema({
  university: {
    type: String,
  },
  degree: {
    type: String,
  },
  year: {
    type: String,
  },
});

const SalarySchema = new Schema({
  amount: {
    type: Number,
  },
  month: {
    type: String,
  },
});

const SubjectReferenceSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
  },
  name: {
    type: String,
  },
});

const TeacherSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    education: EducationSchema,
    subjects: [SubjectReferenceSchema],
    salary: [SalarySchema],
  },
  {
    timestamps: true,
  }
);

TeacherSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
