const router = require('express').Router();
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactions.js')
var auth = require('./auth');

router.get('/', auth.required, getTransactions)
router.get('/:id', auth.required, getTransactions)
router.post('/', auth.required, createTransaction)
router.put('/:id', auth.required, updateTransaction)
router.delete('/:id', auth.required, deleteTransaction)

module.exports = router;