const fs = require('fs');
const path = require('path');
const { msalInstanceWebApp } = require("../configurations/msalConfig/msalConfigWebApp");
const winston = require('winston');

const getCache = () => {
  let tokenCache;
  try {
    tokenCache = msalInstanceWebApp.getTokenCache().serialize();
  } catch (error) {
    console.error('Error serializing token cache:', error);
    // Handle the error appropriately, e.g., return an error message or throw an exception
  }
  return JSON.parse(tokenCache);
};

const logRequestResponse = (requestData) => {
  const logFilePath = path.join(__dirname, '../data.json');

  fs.appendFile(logFilePath, JSON.stringify(requestData) + '\n', (err) => {
    if (err) {
      console.error('Error writing to data.json:', err);
    } else {
      console.log('Request data logged to data.json');
    }
  });
};

const createRequestData = (req, res, responseBody, error, urlPrefix) => {
  const timestamp = new Date().toISOString();
  const url = `${urlPrefix}${req.url}`;
  const requestHeaders = req.headers;
  const requestBody = req.body;

  let responseStatusCode, responseBodyValue, errorValue;

  if (res) {
    responseStatusCode = res.statusCode;
    responseBodyValue = responseBody;
  } else {
    responseStatusCode = 500; 
    errorValue = error.message; 
  }

  const cache = getCache(); 

  const requestData = {
    timestamp,
    method: req.method,
    url,
    requestHeaders,
    requestBody,
    responseStatusCode,
    responseBody: responseBodyValue,
    error: errorValue,
    cache
  };

  return requestData;
};

const createRequestDataMobileApp = (req, res, responseBody, error) => {
  return createRequestData(req, res, responseBody, error, '/api/v1/authMobileApp');
};

const createRequestDataWebApp = (req, res, responseBody, error) => {
  return createRequestData(req, res, responseBody, error, '/api/v1/authWebApp');
};

module.exports = { logRequestResponse, createRequestDataWebApp, createRequestDataMobileApp };

