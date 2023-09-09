require("dotenv").config();

/**
 * this configuration object is used to specify the secret, resave, saveUninitialized, and cookie properties for the `express-session` package, which is used to create a session middleware in a Node.js application.
 */
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set this to true on production
    }
  }
/**
 *  this configuration object is used to specify the origin and credentials for the `cors` package, which is used to configure the CORS headers for a web server, allowing the frontend application to access the resources on the server.
 */
const corsConfig = {
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    optionSuccessStatus: 200,
}
/**
 * this configuration object is used to specify the origin and credentials for the `cookie-parser` package, which is used to parse the cookies in the request headers.
 */
const cookieParserConfig = {
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}

/**
 * this configuration object is used to specify the replacement character for the `mongo-sanitize` package, which is used to sanitize user input and prevent MongoDB injection attacks in a Node.js application.
 
 */
const mongoSanitizeConfig = {
    replaceWith: "_",
}
/**
 * this function is used to configure the CORS headers for a web server, allowing the frontend application to access the resources on the server.
 * @param {Object} res: express middleware response object
 */
const setHeadersConfig =(res) => {
    res.setHeader('Access-Control-Allow-Origin', [process.env.WEB_APP_BASE_URL, process.env.MOBILE_APP_BASE_URL,'*']);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
};


module.exports = {
    sessionConfig,
    corsConfig,
    cookieParserConfig,
    mongoSanitizeConfig,
    setHeadersConfig
}
