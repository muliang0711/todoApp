// 1. This file sets up the Express app with basic middleware and export it
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});

export default app;
