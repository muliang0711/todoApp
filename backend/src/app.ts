// src/app.ts

import express from 'express';
import userRoutes from './routes/UserRoutes';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// User API routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Export the app (so server.ts can use it)
export default app;
