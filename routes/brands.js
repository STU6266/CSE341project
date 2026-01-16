const router = require('express').Router();

const brandsController = require('../controllers/brands');

router.get('/', brandsController.getBrands);

router.get('/:id', brandsController.getBrand);

router.post('/', brandsController.createBrand);

router.put('/:id', brandsController.updateBrand);

router.delete('/:id', brandsController.deleteBrand);

module.exports = router;
