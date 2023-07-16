const express = require('express');
const userController = require('../controllers/user.controller');
const groupController = require('../controllers/group.controller')
const foodController = require('../controllers/food.controller')
const recipeController = require('../controllers/recipe.controller')
const memberController = require('../controllers/member.controller')
const marketController = require('../controllers/market.controller')
const storeController = require('../controllers/store.controller')
const cookController = require('../controllers/cook.controller')
const router = express.Router();

// user
router.get('/user', userController.getAll);
router.post('/login', userController.login);

// group
router.get('/group', groupController.getAll);
router.post('/group/add', groupController.add);

// member
router.post('/member/add', memberController.add)
router.post('/member/delete', memberController.delete)

// food
router.post('/food', foodController.getAll);

// market
router.get('/market/:idUser', marketController.getAll);
router.post('/market/add', marketController.add);
router.post('/market/buy', marketController.buy);

// recipe
router.post('/recipe', recipeController.getAll)
router.post('/recipe/add', recipeController.add)

// store
router.get('/store/:idUser', storeController.getAll)

// cook
router.get('/cook/:idUser', cookController.getAll)
router.post('/cook/add', cookController.add)

module.exports = router;