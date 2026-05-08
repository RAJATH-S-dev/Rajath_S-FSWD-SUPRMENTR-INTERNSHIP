import express from 'express';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Home Route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: #C2652A;">📚 Welcome to Route Master</h1>
        <p style="color: #605850;">Your Bookstore Express API</p>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
          <a href="/api/books" style="padding: 10px 20px; background: #C2652A; color: white; text-decoration: none; border-radius: 8px;">/api/books</a>
          <a href="/api/authors" style="padding: 10px 20px; background: #78706A; color: white; text-decoration: none; border-radius: 8px;">/api/authors</a>
        </div>
      </body>
    </html>
  `);
});

// Mount Routers
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Bookstore API is running!`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
});
