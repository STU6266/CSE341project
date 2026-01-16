const router = require('express').Router();

const filamentsController = require('../controllers/filaments');

router.get('/', filamentsController.getFilaments);

router.get('/:id', filamentsController.getFilament);

router.post('/', filamentsController.createFilament);

router.put('/:id', filamentsController.updateFilament);

router.delete('/:id', filamentsController.deleteFilament);

module.exports = router;
