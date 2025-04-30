import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedAt: Date;
  imageUrl: string;
  source: string;
  trending: boolean;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true, index: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['tech', 'business', 'sports', 'politics', 'health', 'entertainment', 'science'],
    index: true
  },
  author: { type: String, required: true },
  publishedAt: { type: Date, required: true, index: true },
  imageUrl: { type: String, required: true },
  source: { type: String, required: true },
  trending: { type: Boolean, default: false, index: true },
  readTime: { type: Number, required: true },
}, {
  timestamps: true
});

// Index for text search
ArticleSchema.index({ title: 'text', summary: 'text', content: 'text' });

// Index for trending articles
ArticleSchema.index({ trending: 1, publishedAt: -1 });

export default mongoose.model<IArticle>('Article', ArticleSchema); 