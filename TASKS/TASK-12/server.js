const express = require('express');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

// 1. Middlewares
app.use(express.json());
app.use(logger); // Attach our custom logger

// 2. Routes
app.use('/api/products', productRoutes);

// 3. Centralized Error Handling (Must be last!)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Product MVC Server running on http://localhost:${PORT}`);
});