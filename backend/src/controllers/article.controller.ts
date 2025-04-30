import { Request, Response } from 'express';
import Article, { IArticle } from '../models/article.model';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = category ? { category } : {};
    
    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

export const getTrendingArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.aggregate([
      { $match: { trending: true } },
      { $sort: { publishedAt: -1 } },
      { $limit: 10 }
    ]);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending articles', error });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: 'Error creating article', error });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: 'Error updating article', error });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
};

export const searchArticles = async (req: Request, res: Response) => {
  try {
    const { query, category } = req.query;
    const searchQuery = {
      $text: { $search: query as string },
      ...(category ? { category } : {})
    };

    const articles = await Article.find(searchQuery)
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error searching articles', error });
  }
}; 