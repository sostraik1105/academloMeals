const { Router } = require('express');

const router = Router();

const {
    protectToken,
    protectUserAccount,
    protectAdmin,
} = require('../middlewares/users.middleware');

const { restaurantExists } = require('../middlewares/restaurants.middleware');
const {
    checkValidations,
    createRestaurantsValidations,
} = require('../middlewares/validation.middleware');

const {
    getAllRestaurants,
    createRestaurants,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/restaurant.controller');

router.get('/', getAllRestaurants);
router.get('/:id', restaurantExists, getRestaurant);

router.use(protectToken);

router.post(
    '/',
    protectAdmin,
    createRestaurantsValidations,
    checkValidations,
    createRestaurants
);

router
    .route('/:id')
    .patch(protectAdmin, restaurantExists, updateRestaurant)
    .delete(protectAdmin, restaurantExists, deleteRestaurant);

router
    .route('/reviews/:id')
    .post(protectUserAccount, createReview)
    .patch(protectUserAccount, updateReview)
    .delete(protectUserAccount, deleteReview);

module.exports = { restaurantsRoutes: router };
