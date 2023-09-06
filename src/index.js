const express = require("express");
const mongoose= require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv').config({path:"./.env"});
const routes = require("./routes/index");   
const app = express();
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOutput = require('../docs/swaggerOutput.json');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
const PROJECT_NAME = process.env.PROJECT_NAME;
const API_URL = process.env.API_URL;
//middlewares

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
//app.use('/test-it',routes);
app.use(`/${PROJECT_NAME}`, routes);

//error handler
app.use((err,req,res,next)=>
{
    const status = err.statusCode || 500;
    const message = err.message||'Internal server error';

    return res.status(status).json({message,stack:err.stack});
});

const options = {
  definition:{
    openapi:'3.0.0',
    info:{
      title:PROJECT_NAME,
      version:'1.0.0'
    },
    servers:[
      {
        url:`${API_URL}:${PORT}`
      }
    ]
  },
  apis:['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use(`/${PROJECT_NAME}/docs`,swaggerUI.serve,swaggerUI.setup(swaggerOutput))

let server;
mongoose.connect(MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
  server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});

