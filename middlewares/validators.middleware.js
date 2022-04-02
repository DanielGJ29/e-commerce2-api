const { body, validationResult } = require('express-validator');

//util
const { appError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

//?Products
exports.createProductValidations = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('description provide a valid title'),
  body('description')
    .isString()
    .withMessage('Title description be a string')
    .notEmpty()
    .withMessage('Must provide a valid title'),
  body('quantity')
    .isNumeric()
    .withMessage('Quatity must be a number')
    .custom((value) => value > 0)
    .withMessage('Quantity must be greater tha 0'),
  body('price')
    .isNumeric()
    .withMessage('Quatity must be a number')
    .custom((value) => value > 0)
    .withMessage('Quantity must be greater tha 0')
];

//? Cart validations
exports.productInCartValidation = [
  body('productId')
    .isNumeric()
    .withMessage('Product id must be a number')
    .custom((value) => value > 0)
    .withMessage('Must provide a valid id'),
  body('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .custom((value) => value > 0)
    .withMessage('Quantity must be greater than 0')
];

exports.validateResult = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsMsg = errors.array.map(({ msg }) => msg).join('. ');
    return next(new appError(404, errorsMsg));
  }
  next();
});
