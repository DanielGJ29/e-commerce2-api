const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserProducts,
  getUsersOrders,
  getOrderById
} = require('../controllers/users.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');
const {userExits, protectUserAccount} = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/login', loginUser);


router.post('/', createUser);

router.use(validateSession);

router.get('/', getAllUsers);

router.get('/me',getUserProducts);

router.get('/orders', getUsersOrders);

router.get('/orders/:id', getOrderById);

router.use('/:id',userExits)
.route('/:id')
.get(getUserById)
.patch(protectUserAccount,updateUser)
.delete(protectUserAccount,deleteUser);

module.exports = { usersRouter: router };
