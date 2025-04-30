import { Request, Response } from 'express';

const categories = [
  { id: 'tech', name: 'Technology', color: '#3B82F6', icon: '💻' },
  { id: 'business', name: 'Business', color: '#10B981', icon: '💼' },
  { id: 'sports', name: 'Sports', color: '#F59E0B', icon: '⚽' },
  { id: 'politics', name: 'Politics', color: '#8B5CF6', icon: '🏛️' },
  { id: 'health', name: 'Health', color: '#EC4899', icon: '🏥' },
  { id: 'entertainment', name: 'Entertainment', color: '#F43F5E', icon: '🎭' },
  { id: 'science', name: 'Science', color: '#6366F1', icon: '🔬' }
];

export const getCategories = async (req: Request, res: Response) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
}; 