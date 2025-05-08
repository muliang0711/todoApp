import express from 'express';
import userRoutes from './routes/UserRoutes';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// ✅ Correct order: cookie parser first
app.use(cookieParser());

// ✅ Then session middleware
app.use(session({
  secret: 'my_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30 // 30 minutes
  }
}));

// API routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

export default app;
