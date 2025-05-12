import express from 'express';
import userRoutes from './routes/UserRoutes';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/TaskRoutes'; // Assuming you have task routes in the same file
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// ✅ Correct order: cookie parser first
app.use(cookieParser());


app.use(session({
  secret: 'my_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // Assuming you have task routes in the same file
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

export default app;
