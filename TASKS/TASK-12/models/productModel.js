let products = [
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
    { id: 2, name: "Coffee Maker", price: 49.99, category: "Home Appliances" }
];

module.exports = {
    getAll: () => products,
    
    getById: (id) => products.find(p => p.id === parseInt(id)),
    
    add: (name, price, category) => {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, name, price: Number(price), category };
        products.push(newProduct);
        return newProduct;
    }
};