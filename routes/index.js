var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('Welcome to Personal Finance');
});

router.use('/users', require('./users'));
router.use('/savingGoals', require('./savingGoals'));
router.use('/investments', require('./investments'));
router.use('/budgets', require('./budgets'));
router.use('/quotesEOD', require('./quotesEOD'));
router.use('/incomes', require('./incomes'));
router.use('/expenses', require('./expenses'));
router.use('/transactions', require('./transactions'));


module.exports = router;
