const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDB();

const app = express();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Routes
const courses = require("./routes/courses");

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

app.use("/api/v1/courses", courses);

process.on("unhandledRejection", (err, promise) => {
  console.error(`UnhandledRejection ${err.message}`.red);

  server.close(() => process.exit(1));
});
