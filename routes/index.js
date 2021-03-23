var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('Welcome to Personal Finance');
});

router.use('/users', require('./users'));
router.use('/savingGoals', require('./savingGoals'));
router.use('/investments', require('./investments'));

module.exports = router;
