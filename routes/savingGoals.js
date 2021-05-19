const router = require('express').Router();
const {
  createSavingGoal,
  getSavingGoals,
  updateSavingGoal,
  deleteSavingGoal
} = require('../controllers/savingGoals.js')
var auth = require('./auth');

router.get('/', auth.required, getSavingGoals)
router.get('/:id', auth.required, getSavingGoals)// nuevo endpoint con todos los detalles de mascota
router.post('/', auth.required, createSavingGoal)
router.put('/:id', auth.required, updateSavingGoal)
router.delete('/:id', auth.required, deleteSavingGoal)

module.exports = router;