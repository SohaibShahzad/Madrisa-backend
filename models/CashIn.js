const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const CashInSchema = new Schema({
    id: {
        type: Number,
    },
    cashInAmount: {
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

CashInSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.id == null) {
        const seq = await getNextSequenceValue("CashIn");
        doc.id = seq;
    }
    next();
});


const CashIn = mongoose.model("CashIn", CashInSchema);
module.exports = CashIn;
