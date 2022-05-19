const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError');

const createUsersValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty'),
    body('password')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
];

const createRestaurantsValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('address').notEmpty().withMessage('address cannot be empty'),
    body('rating').notEmpty().withMessage('rating cannot be empty'),
];

const createMealsValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('price')
        .notEmpty()
        .withMessage('price cannot be empty')
        .isInt()
        .withMessage('price must be Integer'),
];

const createOrderValidations = [
    body('mealId')
        .notEmpty()
        .withMessage(`meal's id cannot be empty`)
        .isInt()
        .withMessage(`meal's id must be Integer`),
    body('quantity')
        .notEmpty()
        .withMessage('quantity cannot be empty')
        .isInt()
        .withMessage('quantity must be Integer'),
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

module.exports = {
    createUsersValidations,
    checkValidations,
    createRestaurantsValidations,
    createMealsValidations,
    createOrderValidations,
};
