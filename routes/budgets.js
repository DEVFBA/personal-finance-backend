const router = require('express').Router();
const {
  createBudget,
  getBudgets
} = require('../controllers/budgets.js')
var auth = require('./auth');

router.get('/', auth.required, getBudgets)
router.get('/:id', auth.required, getBudgets)// nuevo endpoint con todos los detalles de mascota
router.post('/', auth.required, createBudget)
//router.put('/:id',auth.required, updateSavingGoal)
//router.delete('/:id',auth.required, deleteSavingGoal)

module.exports = router;