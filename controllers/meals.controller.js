const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');
const { errorHandler } = require('../utils/errorHandler');

const getMeals = errorHandler(async (req, res, next) => {
    const meals = await Meals.findAll({
        where: { status: 'active' },
        include: [{ model: Restaurants }],
    });

    res.status(200).json({ meals });
});

const newMeal = errorHandler(async (req, res, next) => {
    const { restaurantId } = req.params;
    const { name, price } = req.body;
    const newMeal = await Meals.create({
        name,
        price,
        restaurantId,
    });

    res.status(201).json({ newMeal });
});

const getMeal = errorHandler(async (req, res, next) => {
    const { meal } = req;
    res.status(201).json({ meal });
});

const updateMeal = errorHandler(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;
    await meal.update({ name, price });
    res.status(200).json({ status: 'success' });
});

const deleteMeal = errorHandler(async (req, res, next) => {
    const { meal } = req;
    await meal.update({ status: 'inactive' });
    res.status(200).json({ status: 'success' });
});

module.exports = { getMeals, newMeal, getMeal, updateMeal, deleteMeal };
