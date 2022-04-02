const {User} = require('../Models/user.model');

//Utils
const {AppError} = require('../util/appError');
const {catchAsync} = require('../util/catchAsync');

exports.userExits = catchAsync(async (req, res, next) => {
    const {id} = req.params;

    const user = await User.findOne({ where:{ status: 'active', id}, attributes:{exclude: ['password'] }});

    if(!user){
        return next(new AppError(404, 'User whit Id not found'));
    }

    req.user = user;
    
    next();
});


exports.protectUserAccount = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const { currentUser } = req;

    if (+id !== currentUser.id) {
        return next(new AppError(403, 'You do not own this account'));
    }
    
    next();
  });