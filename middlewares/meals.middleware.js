const { Meals } = require('../models/meals.model');
const { AppError } = require('../utils/appError');
const { errorHandler } = require('../utils/errorHandler');

const mealExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const meal = await Meals.findOne({
        where: { id },
    });

    if (!meal) {
        return next(new AppError('meal not found given that id', 404));
    }

    req.meal = meal;

    next();
});

module.exports = {
    mealExists,
};
