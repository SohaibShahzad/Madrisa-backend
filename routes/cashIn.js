const express = require('express');
const router = express.Router();

const { addCashIn, updateCashIn, deleteCashIn, getAllCashIn, getCashInById } = require('../controllers/cashInController');

router.route('/').post(addCashIn).get(getAllCashIn);
router.route('/:id').put(updateCashIn).delete(deleteCashIn).get(getCashInById);
router.route('/').get(getAllCashIn);

module.exports = router;
