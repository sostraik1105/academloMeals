const { Router } = require('express');

const {
    protectToken,
    userExists,
    protectUserAccount,
} = require('../middlewares/users.middleware');

const {
    checkValidations,
    createUsersValidations,
} = require('../middlewares/validation.middleware');

const {
    signup,
    login,
    updateUser,
    deleteUser,
    getOrders,
    getOrderById,
} = require('../controllers/users.controller');

const router = Router();

router.post('/signup', createUsersValidations, checkValidations, signup);
router.post('/login', login);

router.use(protectToken);

router
    .route('/:id')
    .patch(userExists, protectUserAccount, updateUser)
    .delete(userExists, protectUserAccount, deleteUser);

router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrderById);

module.exports = { usersRoutes: router };
