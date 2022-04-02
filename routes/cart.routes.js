const express = require('express');

// Controller
const {
  addProductToCard,
  addCartUser,
  updateProductCartUser,
  DeleteProductFromCard,
  purchaseCart
} = require('../controllers/cart.controller');

// Middleware
const { validateSession } = require('../middlewares/auth.middleware');
const {
  productInCartValidation,
  validateResult
} = require('../middlewares/validators.middleware');
const { cartExists } = require('../middlewares/cart.middleware');
const { productExists } = require('../middlewares/products.middleware');

const router = express.Router();

router.use(validateSession);

router.get('/', addCartUser);

router.post(
  '/add-product',
  productInCartValidation,
  validateResult,
  addProductToCard
);

router.patch(
  '/update-product',
  productInCartValidation,
  validateResult,
  productExists,
  cartExists,
  updateProductCartUser
);

router.post('/purchase', cartExists, purchaseCart);

router.delete('/:productId', cartExists, DeleteProductFromCard);

module.exports = { cartRouter: router };
