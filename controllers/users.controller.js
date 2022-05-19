const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Users } = require('../models/users.model');
const { Orders } = require('../models/orders.model');
const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');

const { errorHandler } = require('../utils/errorHandler');
const { AppError } = require('../utils/appError');
dotenv.config({ path: './config.env' });

const signup = errorHandler(async (req, res, next) => {
    const { name, email, password, status, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const cryptPass = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        name,
        email,
        password: cryptPass,
        role,
        status,
    });

    newUser.password = undefined;

    res.status(201).json({ newUser });
});

const login = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email, status: 'active' } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(200).json({ token, user });
});

const updateUser = errorHandler(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;
    await user.update({ name, email });
    res.status(200).json({ status: 'success' });
});

const deleteUser = errorHandler(async (req, res, next) => {
    const { user } = req;
    await user.update({ status: 'disabled' });
    res.status(200).json({ status: 'success' });
});

const getOrders = errorHandler(async (req, res, next) => {
    const { id } = req.sessionUser;
    const orders = await Orders.findAll({
        where: { userId: id },
        include: [
            {
                model: Meals,
                attributes: ['name'],
                include: [{ model: Restaurants, attributes: ['id', 'name'] }],
            },
        ],
    });
    res.json({ orders });
});

const getOrderById = errorHandler(async (req, res, next) => {
    const { id } = req.sessionUser;
    const { orderId } = req.params;
    const order = await Orders.findOne({
        where: { userId: id, id: orderId },
    });

    if (!order) {
        return next(new AppError('order not found', 404));
    }

    res.status(200).json({ order });
});

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getOrders,
    getOrderById,
};
