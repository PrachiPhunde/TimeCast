# Real-Time News Feed Application

A real-time news feed application built with React, Node.js, Express, MongoDB, and Socket.io.

## Features

- Real-time news updates using WebSockets
- Category-based news filtering
- Trending news section
- Search functionality
- Responsive design
- Docker and Kubernetes deployment support

## Tech Stack

- Frontend: React, Redux, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Real-time: Socket.io
- Deployment: Docker, Kubernetes

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker
- Kubernetes (optional)

## Local Development

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Docker Deployment

```bash
# Build and start containers
docker-compose up --build
```

## Kubernetes Deployment

```bash
# Create persistent volume claim
kubectl apply -f k8s/pvc.yaml

# Deploy services
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## API Documentation

API documentation is available at:
- Swagger UI: http://localhost:3001/api-docs
- OpenAPI Spec: /backend/swagger.yaml

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001/api)

### Backend
- `PORT`: Server port (default: 3001)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

## License

MIT 