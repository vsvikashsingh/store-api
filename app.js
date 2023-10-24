require('dotenv').config()

const express = require('express');
require('express-async-errors');

const connectDB = require('./db/connect.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const notFound = require('./middleware/not-found.js')
const productsRoutes  = require('./routes/products.js');

const app = express()

app.use(express.json());

//routes
app.use('/api/products', productsRoutes)

//eoor handling middlewares
app.use(errorHandlerMiddleware)
app.use(notFound)

const port = 5000; 

const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, ()=>{
            console.log(`server listening on port ${port}...`)
        })
    }catch(err){
        console.log(err)
    }
}

start();
