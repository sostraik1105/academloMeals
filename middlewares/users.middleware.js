const { Users } = require('../models/users.model');
const { errorHandler } = require('../utils/errorHandler');

const userExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
    });

    if (!user) {
        return next(new AppError('User not found given that id', 404));
    }

    req.user = user;

    next();
});

const protectToken = errorHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Session invalid', 403));
    }

    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    const user = await Users.findOne({
        where: { id: decoded.id, status: 'enabled' },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token is no longer available', 403)
        );
    }

    req.sessionUser = user;

    next();
});

const protectAdmin = errorHandler(async (req, res, next) => {
    if (req.sessionUser.role !== 'admin') {
        return next(new AppError('Access not granted', 403));
    }

    next();
});

const protectUserAccount = errorHandler(async (req, res, next) => {
    const { sessionUser, user } = req;
    if (sessionUser.id !== user.id) {
        return next(new AppError('You do not own this account', 403));
    }
    next();
});

module.exports = { userExists, protectToken, protectUserAccount, protectAdmin };
