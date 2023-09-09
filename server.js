//----General Imports----//
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const cors = require("cors");
const routes = require("./routes");
 
//----Local Imports----//
const MongoDbConnection=require("./configurations/mongoDbConfig");
const { sessionConfig, corsConfig,cookieParserConfig,mongoSanitizeConfig,setHeadersConfig } = require("./configurations/generalConfigs");
dotenv.config();



const app = express();
 

app.use(session(sessionConfig));
app.use(cors(corsConfig));
//app.use(cookieParser(cookieParserConfig));
app.use((req, res, next) => {setHeadersConfig(res);next();});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize(mongoSanitizeConfig));

app.get('/', (req, res) => {
  res.render('signin', { showSignInButton: true });
});

app.use("/", routes);

MongoDbConnection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
