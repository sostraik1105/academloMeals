const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError');

const createUsersValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
];

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);

        const errorMsg = messages.join('. ');

        return next(new AppError(errorMsg, 400));
    }

    next();
};

module.exports = { createUsersValidations, checkValidations };
