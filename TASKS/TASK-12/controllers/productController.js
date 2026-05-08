const Product = require('../models/productModel');

exports.getAllProducts = (req, res, next) => {
    try {
        const products = Product.getAll();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

exports.getProductById = (req, res, next) => {
    try {
        const product = Product.getById(req.params.id);
        if (!product) {
            const error = new Error("Product not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

exports.addProduct = (req, res, next) => {
    try {
        const { name, price, category } = req.body;

        if (!name || price === undefined || !category) {
            const error = new Error("Please provide name, price, and category");
            error.status = 400;
            return next(error);
        }

        const newProduct = Product.add(name, price, category);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        next(error);
    }
};