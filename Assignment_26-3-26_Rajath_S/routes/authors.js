import express from 'express';
import { authors, books } from '../data.js';

const router = express.Router();

// GET all authors
router.get('/', (req, res) => {
  res.json(authors);
});

// GET a single author by ID
router.get('/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  // Include their books if requested
  if (req.query.includeBooks === 'true') {
    const authorBooks = books.filter(b => b.authorId === authorId);
    return res.json({ ...author, books: authorBooks });
  }

  res.json(author);
});

// POST a new author
router.post('/', (req, res) => {
  const { name, country } = req.body;

  if (!name || !country) {
    return res.status(400).json({ error: 'Missing required fields (name, country)' });
  }

  const newAuthor = {
    id: authors.length > 0 ? Math.max(...authors.map(a => a.id)) + 1 : 1,
    name,
    country
  };

  authors.push(newAuthor);
  res.status(201).json({ message: 'Author created successfully', author: newAuthor });
});

export default router;
