const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./Db/connectDB");
connectDB();
const PORT = process.env.PORT || 3000;

const taskRouter = require("./Routes/taskRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Update to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(bodyParser.json());

// routes
app.use("/api/v1/tasks", taskRouter);
// http://localhost:5000/api/v1/tasks

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
