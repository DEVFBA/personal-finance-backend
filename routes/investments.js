const router = require('express').Router();
const {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
} = require('../controllers/investments.js')
var auth = require('./auth');

router.get('/', auth.required, getInvestments)
router.get('/:id', auth.required, getInvestments)// nuevo endpoint con todos los detalles de mascota
router.post('/', auth.required, createInvestment)
//router.put('/:id',auth.required, updateSavingGoal)
//router.delete('/:id',auth.required, deleteSavingGoal)

module.exports = router;