const express = require('express');
const { addSingleProduct, getAllProducts, getProduct } = require('../controllers/products.js');

const router = express.Router();

router.route('/').get(getAllProducts).post(addSingleProduct)
router.route('/:id').get(getProduct)

module.exports = router;