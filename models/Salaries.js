const { default: mongoose, Mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const SalariesSchema = new Schema({
    id: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    date: {
        type: Date,
    },
    teacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
}, {
    timestamps: true
});


SalariesSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Salaries");
        doc.id = seq;
    }
    next();
});


const Salaries = mongoose.model("Salaries", SalariesSchema);
module.exports = Salaries;
