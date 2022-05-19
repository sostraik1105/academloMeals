const { Router } = require('express');

const {
    deleteMeal,
    getMeal,
    getMeals,
    newMeal,
    updateMeal,
} = require('../controllers/meals.controller');

const {
    protectToken,
    protectAdmin,
} = require('../middlewares/users.middleware');

const { mealExists } = require('../middlewares/meals.middleware');

const router = Router();

router.get('/', getMeals);
router.get('/:id', mealExists, getMeal);

router.use(protectToken);

router.post('/:restaurantId', protectAdmin, newMeal);
router
    .route('/:id')
    .patch(protectAdmin, updateMeal)
    .delete(protectAdmin, deleteMeal);

module.exports = { mealsRoutes: router };
