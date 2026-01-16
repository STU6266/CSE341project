const router = require('express').Router();

router.get('/', (req, res) => res.send('Hello World'));

const swaggerRouter = require('./swagger');
console.log('swagger type:', typeof swaggerRouter);

const filamentsRouter = require('./filaments');
console.log('filaments type:', typeof filamentsRouter);

const brandsRouter = require('./brands');
console.log('brands type:', typeof brandsRouter);

router.use('/api-docs', swaggerRouter);
router.use('/filaments', filamentsRouter);
router.use('/brands', brandsRouter);

module.exports = router;
