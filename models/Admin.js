const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const AdminSchema = new Schema({
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


AdminSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("Admin");
        doc.id = seq;
    }
    next();
});





const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
