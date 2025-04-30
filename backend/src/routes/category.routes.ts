import express from 'express';
import { getCategories } from '../controllers/category.controller';

const router = express.Router();

// Get all categories
router.get('/', getCategories);

export default router; 