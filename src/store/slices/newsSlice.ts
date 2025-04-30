import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article, Category } from '@/types';
import { fetchArticles, generateNewArticle } from '@/mock/data';

interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  selectedCategory: Category | null;
  subscribedCategories: Category[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: NewsState = {
  articles: [],
  filteredArticles: [],
  selectedCategory: null,
  subscribedCategories: ['tech', 'business'],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchAllArticles = createAsyncThunk(
  'news/fetchAllArticles',
  async () => {
    const articles = await fetchArticles();
    return articles;
  }
);

export const fetchArticlesByCategory = createAsyncThunk(
  'news/fetchArticlesByCategory',
  async (category: Category) => {
    const articles = await fetchArticles(category);
    return { articles, category };
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
      
      if (action.payload === null) {
        state.filteredArticles = state.articles;
      } else {
        state.filteredArticles = state.articles.filter(
          article => article.category === action.payload
        );
      }
    },
    toggleCategorySubscription: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      const isSubscribed = state.subscribedCategories.includes(category);
      
      if (isSubscribed) {
        state.subscribedCategories = state.subscribedCategories.filter(c => c !== category);
      } else {
        state.subscribedCategories.push(category);
      }
    },
    addRealtimeArticle: (state, action: PayloadAction<Article>) => {
      const newArticle = action.payload;
      state.articles = [newArticle, ...state.articles];
      
      // Update filtered articles if needed
      if (state.selectedCategory === null || state.selectedCategory === newArticle.category) {
        state.filteredArticles = [newArticle, ...state.filteredArticles];
      }
      
      state.lastUpdated = new Date().toISOString();
    },
    simulateNewArticle: (state) => {
      const newArticle = generateNewArticle();
      state.articles = [newArticle, ...state.articles];
      
      // Update filtered articles if needed
      if (state.selectedCategory === null || state.selectedCategory === newArticle.category) {
        state.filteredArticles = [newArticle, ...state.filteredArticles];
      }
      
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.filteredArticles = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(fetchArticlesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        const { articles, category } = action.payload;
        state.filteredArticles = articles;
        state.selectedCategory = category;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export const { 
  setSelectedCategory, 
  toggleCategorySubscription, 
  addRealtimeArticle,
  simulateNewArticle
} = newsSlice.actions;

export default newsSlice.reducer;