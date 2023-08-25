const express = require('express');
const router = express.Router();

const { addCashOut, updateCashOut, deleteCashOut, getAllCashOut, getCashOutById, } = require('../controllers/cashOutController');

router.route('/').post(addCashOut).get(getAllCashOut);
router.route('/:id').put(updateCashOut).delete(deleteCashOut).get(getCashOutById);
router.route('/').get(getAllCashOut);

module.exports = router;
