const router = require('express').Router();

const filamentsController = require('../controllers/filaments');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', filamentsController.getFilaments);

router.get('/:id', filamentsController.getFilament);

router.post('/', isAuthenticated, filamentsController.createFilament);

router.put('/:id', isAuthenticated, filamentsController.updateFilament);

router.delete('/:id', isAuthenticated, filamentsController.deleteFilament);

module.exports = router;
