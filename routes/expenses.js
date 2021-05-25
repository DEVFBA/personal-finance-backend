const router = require('express').Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} = require('../controllers/expenses.js')
var auth = require('./auth');

router.get('/', auth.required, getExpenses)
router.get('/:id', auth.required, getExpenses)
router.post('/', auth.required, createExpense)
router.put('/:id', auth.required, updateExpense)
router.delete('/:id', auth.required, deleteExpense)

module.exports = router;