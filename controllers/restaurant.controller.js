const { Restaurants } = require('../models/restaurants.model');
const { Reviews } = require('../models/reviews.model');
const { errorHandler } = require('../utils/errorHandler');

const getAllRestaurants = errorHandler(async (req, res, next) => {
    const restaurants = await Restaurants.findAll({
        where: { status: 'active' },
    });

    res.status(200).json({ restaurants });
});

const createRestaurants = errorHandler(async (req, res, next) => {
    const { name, address, rating } = req.body;
    const newRestaurant = await Restaurants.create({
        name,
        address,
        rating,
    });

    res.status(201).json({ newRestaurant });
});

const getRestaurant = errorHandler(async (req, res, next) => {
    const { restaurant } = req;
    res.status(201).json({ restaurant });
});

const updateRestaurant = errorHandler(async (req, res, next) => {
    const { restaurant } = req;
    const { name, address } = req.body;
    await restaurant.update({ name, address });
    res.status(200).json({ status: 'success' });
});

const deleteRestaurant = errorHandler(async (req, res, next) => {
    const { restaurant } = req;
    await restaurant.update({ status: 'inactive' });
    res.status(200).json({ status: 'success' });
});

const createReview = errorHandler(async (req, res, next) => {});

const updateReview = errorHandler(async (req, res, next) => {});

const deleteReview = errorHandler(async (req, res, next) => {});

module.exports = {
    getAllRestaurants,
    createRestaurants,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
};
