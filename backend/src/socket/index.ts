import { Server, Socket } from 'socket.io';
import Article from '../models/article.model';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Handle category subscriptions
    socket.on('subscribe', async (category: string) => {
      socket.join(category);
      console.log(`Client ${socket.id} subscribed to ${category}`);
    });

    socket.on('unsubscribe', (category: string) => {
      socket.leave(category);
      console.log(`Client ${socket.id} unsubscribed from ${category}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Watch for changes in the Article collection
  const articleChangeStream = Article.watch();

  articleChangeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const newArticle = change.fullDocument;
      if (newArticle) {
        // Emit to all clients subscribed to the article's category
        io.to(newArticle.category).emit('newArticle', newArticle);
        
        // If the article is trending, emit to all clients
        if (newArticle.trending) {
          io.emit('trendingArticle', newArticle);
        }
      }
    }
  });
}; 