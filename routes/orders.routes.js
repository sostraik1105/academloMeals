const { Router } = require('express');
const {
    getOrdersByUser,
    newOrder,
    updateOrder,
    cancelOrder,
} = require('../controllers/orders.controller');

const { protectToken } = require('../middlewares/users.middleware');

const {
    checkValidations,
    createOrderValidations,
} = require('../middlewares/validation.middleware');

const router = Router();

router.use(protectToken);

router.get('/me', getOrdersByUser);
router.post('/', createOrderValidations, checkValidations, newOrder);
router.route('/:id').patch(updateOrder).delete(cancelOrder);

module.exports = { ordersRoutes: router };
