// Models
const { Cart } = require('../Models/cart.model');
const { Product } = require('../Models/product.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.cartExists = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  // Find user's cart
  const cart = await Cart.findOne({
    where: { status: 'active', userId: currentUser.id },
    include: [
      {
        model: Product,
        through: { where: { status: 'active' } }
      }
    ]
  });

  if (!cart) {
    return next(new AppError(400, 'This user does not have a cart yet'));
  }

  req.cart = cart;

  next();
});