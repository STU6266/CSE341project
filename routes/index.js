const router = require('express').Router();
const passport = require('passport');
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

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
  });

module.exports = router;
