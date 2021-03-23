var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('Welcome to Personal Finance');
});

router.use('/users', require('./users'));

module.exports = router;
