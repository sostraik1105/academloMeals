const { Orders } = require('../models/orders.model');
const { Meals } = require('../models/meals.model');

const { errorHandler } = require('../utils/errorHandler');
const { AppError } = require('../utils/appError');

const getOrdersByUser = errorHandler(async (req, res, next) => {
    const { id } = req.sessionUser;

    const orders = await Orders.findAll({ where: { userId: id } });
    res.status(200).json({ orders });
});

const newOrder = errorHandler(async (req, res, next) => {
    const { id } = req.sessionUser;
    const { quantity, mealId } = req.body;

    const meal = await Meals.findOne({
        where: {
            id: mealId,
            status: 'active',
        },
    });

    if (!meal) {
        return next(new AppError('Meal not found given that id', 404));
    }

    const newOrder = await Orders.create({
        mealId,
        userId: id,
        price: meal.price * quantity,
    });

    res.json({ newOrder });
});

const updateOrder = errorHandler(async (req, res, next) => {});

const cancelOrder = errorHandler(async (req, res, next) => {});

module.exports = { getOrdersByUser, newOrder, updateOrder, cancelOrder };
