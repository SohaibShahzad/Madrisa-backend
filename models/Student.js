const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const StudentSchema = new Schema({
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


StudentSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Student");
        doc.id = seq;
    }
    next();
});





const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
