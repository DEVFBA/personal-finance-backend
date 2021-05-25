const router = require('express').Router();
const {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome
} = require('../controllers/incomes.js')
var auth = require('./auth');

router.get('/', auth.required, getIncomes)
router.get('/:id', auth.required, getIncomes)
router.post('/', auth.required, createIncome)
router.put('/:id', auth.required, updateIncome)
router.delete('/:id', auth.required, deleteIncome)

module.exports = router;