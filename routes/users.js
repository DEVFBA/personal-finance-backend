const router = require('express').Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  login
} = require('../controllers/users')
const auth = require('./auth');

router.get('/', auth.required, getUsers)
router.get('/:id', auth.required, getUsers);
router.post('/', createUser)
router.post('/login', login)
router.put('/:id', auth.required, updateUser)
router.delete('/:id', auth.required, deleteUser)

module.exports = router;