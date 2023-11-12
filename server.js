const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const connectDB = require("./constants/db");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const colors = require("colors");
const port = process.env.PORT || 5000;

connectDB();
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
