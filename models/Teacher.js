const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const TeacherSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: string,
    },
}, {
    timestamps: true
});


TeacherSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Teacher");
        doc.id = seq;
    }
    next();
});





const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
