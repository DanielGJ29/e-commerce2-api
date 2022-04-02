// Models
const { User } = require('../Models/user.model');
const { Cart } = require('../Models/cart.model');
const { Product } = require('../Models/product.model');
const { Order } = require('../Models/order.model');
const { ProductInCart } = require('../Models/productinCart.model');

const initModels = () => {
  //1<-->M
  User.hasMany(Product);
  Product.belongsTo(User);

  //1<-->M
  User.hasMany(Order);
  Order.belongsTo(User);

  //1<-->1
  User.hasOne(Cart);
  Cart.belongsTo(User);

  //M<-->M
  Cart.belongsToMany(Product, { through: ProductInCart });
  Product.belongsToMany(Cart, { through: ProductInCart });

  //1<-->1
  Cart.hasOne(Order);
  Order.belongsTo(Cart);

  //   // //1<-->M
  //  User.hasMany(User);
  // /Product.belongsTo(User);
};

module.exports = { initModels };
