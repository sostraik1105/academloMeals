const { Restaurants } = require('../models/restaurants.model');
const { errorHandler } = require('../utils/errorHandler');
const { AppError } = require('../utils/appError');

const restaurantExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurants.findOne({
        where: { id },
    });

    if (!restaurant) {
        return next(new AppError('restaurant not found given that id', 404));
    }

    req.restaurant = restaurant;

    next();
});

module.exports = {
    restaurantExists,
};
