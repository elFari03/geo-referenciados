const express = require('express');
const router = express.Router();


const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const brandsRouter = require('./brandsRouter');
const productsRouter = require('./productsRouter');


router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/brands', brandsRouter);
router.use('/products', productsRouter);

module.exports = router;
