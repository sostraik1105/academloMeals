const { Router } = require('express');
const {
    getOrdersByUser,
    newOrder,
    updateOrder,
    cancelOrder,
} = require('../controllers/orders.controller');

const {
    protectToken,
    protectUserAccount,
} = require('../middlewares/users.middleware');

const router = Router();

router.use(protectToken);

router.get('/me', getOrdersByUser);
router.post('/', newOrder);
router.route('/:id').patch(updateOrder).delete(cancelOrder);

module.exports = { ordersRoutes: router };
