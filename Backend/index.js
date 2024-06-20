// Importing files to project
import express from "express";                      //Importing Express js framework
import {PORT, mongoDBURL} from "./config.js";       //Importing PORT from config file
import mongoose from 'mongoose';                    //Importing the mongoose library to work with MongoDB
import {Book} from './models/bookModel.js';         //Importing models
import bookRoute from './routes/bookRoutes.js'      //Importing routes
import CORS from 'cors'                             //Importing CORS Policy Library

const app = express();

//Adding a middleware for parsing request body from postman
app.use(express.json());                            //Allows Express to use json body

//Route to get data from server
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack') 
});

//Middleware for handling   CORS Policy
app.use(CORS({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

//Middleware to connect routes with model
    app.use('/books', bookRoute);                   //for each request with prefix of '/books' handle them with bookRoute

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');

    // A function to listen to the PORT
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });

}).catch((error) => {
    console.log(`Database connection failed.\nError: ${error}`);
});