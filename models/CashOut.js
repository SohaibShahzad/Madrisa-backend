const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const CashOutSchema = new Schema({
    id: {
        type: Number,
    },
    cashOutAmount: {
        type: String,
    },
    descripition: {
        type: String,
    },
    date: {
        type: String,
    },
    document: {
        type: String,
    },
}, {
    timestamps: true
});

CashOutSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("CashOut");
        doc.id = seq;
    }
    next();
});


const CashOut = mongoose.model("CashOut", CashOutSchema);
module.exports = CashOut;
