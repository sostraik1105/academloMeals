const { body, validationResult } = require('express-validator');

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

        return res.status(400).json({
            status: 'error',
            message: errorMsg,
        });
    }

    next();
};

module.exports = { createUsersValidations, checkValidations };
