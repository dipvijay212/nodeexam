require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes")
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());


app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 8080; 


app.listen(PORT, async () => {
  try {
    await connection;
    console.log(" Connected to database");
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
});



