const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./Db/connectDB");
connectDB();
const PORT = process.env.PORT || 3000;

const taskRouter = require("./Routes/taskRoutes");
const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.json());

// routes
app.use("/api/v1/tasks", taskRouter);
// http://localhost:5000/api/v1/tasks

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
