const router = require('express').Router();
const {
    createBankTransaction,
    getBankTransactions,
    deleteBankTransaction,
    updateBankTransaction
} = require('../controllers/bankTransactions.js')
var auth = require('./auth');

router.get('/', auth.required, getBankTransactions)
router.get('/:id', auth.required, getBankTransactions)
router.post('/', auth.required, createBankTransaction)
router.put('/:id', auth.required, updateBankTransaction)
router.delete('/:id', auth.required, deleteBankTransaction)

module.exports = router;