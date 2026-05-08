const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// ==========================================
// 💾 IN-MEMORY DATABASE
// ==========================================
let products = [
    { id: 1, name: "Wireless Mouse", price: 25.99 },
    { id: 2, name: "Mechanical Keyboard", price: 89.50 }
];

// ==========================================
// 🛣️ ROUTES
// ==========================================

// 1. GET all products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// 2. POST new product
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    // Basic validation
    if (!name || price === undefined) {
        return res.status(400).json({ message: "Please provide both name and price." });
    }

    // Generate a new ID (finds the highest current ID and adds 1)
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: newId,
        name: name,
        price: Number(price)
    };

    products.push(newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// 3. PUT update product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    // Find the index of the product we want to update
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Update the fields if they were provided in the request
    if (name) products[productIndex].name = name;
    if (price !== undefined) products[productIndex].price = Number(price);

    res.status(200).json({ message: "Product updated successfully", product: products[productIndex] });
});

// 4. DELETE product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    
    // Find the index of the product we want to delete
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Remove the product from the array
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Product API is running on http://localhost:${PORT}`);
});