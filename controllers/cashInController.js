const asyncHandler = require('express-async-handler');
const CashIn = require('../models/CashIn');


const addCashIn = asyncHandler(async (req, res) => {
    try {
        const { cashInAmount, descripition, date } = req.body;
        const createCashIn = new CashIn({
            cashInAmount,
            descripition,
            date,
        });
        const cashIn = await createCashIn.save();
        res.status(201).json({ message: 'Cash In', cashIn });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const updateCashIn = asyncHandler(async (req, res) => {
    try {
        const { cashInAmount, descripition, date } = req.body;
        const findCashIn = await CashIn.findById(req.params.id);

        if (!findCashIn) return res.status(400).json({ message: 'Cash In not found' });

        findCashIn.cashInAmount = cashInAmount;
        findCashIn.descripition = descripition;
        findCashIn.date = date;

        const updatedCashIn = await findCashIn.save();
        res.status(201).json({ message: 'Cash In Updated', updatedCashIn });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteCashIn = asyncHandler(async (req, res) => {
    try {
        const findCashIn = await CashIn.findById(req.params.id);

        if (!findCashIn) return res.status(400).json({ message: 'Cash In not found' });

        await findCashIn.deleteOne();
        res.status(201).json({ message: 'Cash In Deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getAllCashIn = asyncHandler(async (req, res) => {
    try {
        const cashIn = await CashIn.find({});

        res.status(201).json({ cashIn });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getCashInById = asyncHandler(async (req, res) => {
    try {
        const findCashIn = await CashIn.findById(req.params.id);

        if (!findCashIn) return res.status(400).json({ message: 'Cash In not found' });

        res.status(201).json({ findCashIn });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





module.exports = {
    addCashIn,
    updateCashIn,
    deleteCashIn,
    getAllCashIn,
    getCashInById,
};
