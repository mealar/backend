//----General Imports----//
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const cors = require("cors");
const routes = require("./routes");
const swaggerUI = require("swagger-ui-express");
const path = require("path");
// const { auth } = require("express-openid-connect");
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

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "..", "public")));
// app.use(
//   auth({
//     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     secret: process.env.SESSION_SECRET,
//     authRequired: false,
//     auth0Logout: true,
//   })
// );
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.oidc.isAuthenticated();
//   next();
// });
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

const port = process.env.PORT_API || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
