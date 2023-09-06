const asyncHandler = require('express-async-handler');
const CashOut = require('../models/CashOut');


const addCashOut = asyncHandler(async (req, res) => {
    try {
        const { cashOutAmount, descripition, date } = req.body;
        const createCashOut = new CashOut({
            cashOutAmount,
            descripition,
            date,
        });
        const cashOut = await createCashOut.save();
        res.status(201).json({ message: 'Cash In', cashOut });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const updateCashOut = asyncHandler(async (req, res) => {
    try {
        const { cashOutAmount, descripition, date } = req.body;
        const findCashOut = await CashOut.findById(req.params.id);

        if (!findCashOut) return res.status(400).json({ message: 'Cash In not found' });

        findCashOut.cashOutAmount = cashOutAmount;
        findCashOut.descripition = descripition;
        findCashOut.date = date;

        const updatedCashOut = await findCashOut.save();
        res.status(201).json({ message: 'Cash In Updated', updatedCashOut });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteCashOut = asyncHandler(async (req, res) => {
    try {
        const findCashOut = await CashOut.findById(req.params.id);

        if (!findCashOut) return res.status(400).json({ message: 'Cash In not found' });

        await findCashOut.deleteOne();
        res.status(201).json({ message: 'Cash In Deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getAllCashOut = asyncHandler(async (req, res) => {
    try {
        const cashOut = await CashOut.find({});

        res.status(201).json({ cashOut });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getCashOutById = asyncHandler(async (req, res) => {
    try {
        const findCashOut = await CashOut.findById(req.params.id);

        if (!findCashOut) return res.status(400).json({ message: 'Cash In not found' });

        res.status(201).json({ findCashOut });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





module.exports = {
    addCashOut,
    updateCashOut,
    deleteCashOut,
    getAllCashOut,
    getCashOutById,
};
