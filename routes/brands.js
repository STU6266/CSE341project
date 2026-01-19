const router = require('express').Router();

const brandsController = require('../controllers/brands');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', brandsController.getBrands);

router.get('/:id', brandsController.getBrand);

router.post('/', isAuthenticated, brandsController.createBrand);

router.put('/:id', isAuthenticated, brandsController.updateBrand);

router.delete('/:id', isAuthenticated, brandsController.deleteBrand);

module.exports = router;
