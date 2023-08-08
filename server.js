const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const cors = require("cors");
const restaurantRoute = require("./routes/restaurantRoute");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(
  cookieParser({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use("/api/v1/restaurant", restaurantRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
