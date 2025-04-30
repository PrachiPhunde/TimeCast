import express from 'express';
import {
  getArticles,
  getTrendingArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles
} from '../controllers/article.controller';

const router = express.Router();

// Get all articles with pagination and category filter
router.get('/', getArticles);

// Get trending articles
router.get('/trending', getTrendingArticles);

// Search articles
router.get('/search', searchArticles);

// Create new article
router.post('/', createArticle);

// Update article
router.put('/:id', updateArticle);

// Delete article
router.delete('/:id', deleteArticle);

export default router; 