// app.ts
import express from "express";
import userRoutes from "./routes/UserRoutes";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Use user-related routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
