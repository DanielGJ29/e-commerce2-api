// Models
const { User } = require('../Models/user.model');
const { Product } = require('../Models/product.model');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { productId } = req.body;

  const product = await Product.findOne({
    where: { status: 'active', id: id || productId },
    include: [{ model: User, attributes: { exclude: ['password'] } }]
  });

  if (!product) {
    return next(new AppError(404, 'product with that Id does not exist'));
  }

  req.product = product;

  next();
});

exports.productOwner = catchAsync(async (req, res, next) => {
  const { currentUser, product } = req;

  if (product.userId !== currentUser.id) {
    return next(new AppError(403, 'the current user was not the creator'));
  }
  next();
});
