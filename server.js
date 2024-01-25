//----General Imports----//
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const path = require("path");
const { auth } = require("express-openid-connect");
const routes = require("./routes");
const swaggerDocument = require("./swagger.json");

//----Local Imports----//
const MongoDbConnection = require("./configurations/mongoDbConfig");
const {
  sessionConfig,
  corsConfig,
  cookieParserConfig,
  mongoSanitizeConfig,
  setHeadersConfig,
} = require("./configurations/generalConfigs");
dotenv.config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
};

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "..", "public")));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router

app.use(session(sessionConfig));
app.use(cors(corsConfig));
//app.use(cookieParser(cookieParserConfig));
app.use((req, res, next) => {
  setHeadersConfig(res);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize(mongoSanitizeConfig));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1", routes);

MongoDbConnection();

const port = process.env.PORT_API || 8080;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
