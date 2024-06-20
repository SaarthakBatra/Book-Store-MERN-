import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Route to save a new Book on server
router.post('/', async (request, response) => {   //working with mongoose is an asynchronous process
    try{
        //Validating the input(all fields are available)
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Input fields missing. Invalid request',
                syntax: {
                    title: "", 
                    author: "",
                    publishYear: null
                }
            });
        }

        //Defining a new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        //Creating a new book
        const book = await Book.create(newBook);
        
        console.log(`New Book Created\n${book}`);
        return response.status(201).send({
            message: `New Book Created`,
            data: book
        });

    } 
    catch(error) {
        console.log(`Failed to save the book\nError: ${error}`);
        response.status(500).send({
            message: 'Failed to save the book',
            error: error.message
        });
    }
});

//Route to get all books from database
router.get('/', async (request, response) => {
    try {
        console.log(`Retrieving books list`);
        const books = await Book.find({});

        console.log(`Books list sent`);
        return response.status(200).json({
            count: books.length,
            data: books
        }
        );
    }
    catch(error) {
        console.log(`Failed to get books data\nError: ${error}`);
        response.status(500).send({
            message: 'Failed to save the book',
            error: error.message
        });
    }
});

//Route to get a specific book from database by id
router.get('/:id', async (request, response) => { // : is used to tag a specific parameter in Routes
    try {
        //getting id from request
        const {id} = request.params;

        console.log(`Retrieving book by id ${id}`);
        const book = await Book.findById(id);

        console.log(`Book ${id} sent`);
        return response.status(200).json({
            message: 'Successfully retrieved book data',
            data: book
        }
        );
    }
    catch(error) {
        console.log(`Failed to get book by id\n${error}`);
        response.status(500).send({
            message: 'Failed to get book by id',
            error: error.message
        });
    }
});

//Route to update a book
router.put('/:id', async (request, response) => {
    try{
        //Validating the input
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Input fields missing. Invalid request',
                syntax: {
                    title: "", 
                    author: "",
                    publishYear: null
                }
            });
        }

        //getting id from request
        const {id} = request.params;

        console.log(`Updating book by id ${id}`);
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            console.log(`Updating book ${id} failed`);
            return response.status(404).send({
                message: `Book ${id} not found`,
            });
        }

        console.log(`Book ${id} updated successfully`);
        return response.status(200).json({
            message: 'Book updated successfully',
            data: result
        }
        );

    }
    catch(error) {
        console.log(`Failed to update book\n${error}`);
        response.status(500).send({
            message: 'Failed to update the book',
            error: error.message
        });
    }
});

//Route to delete book by id
router.delete('/:id', async (request, response) => {
    try{
        //getting id from request
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            console.log(`Deleting book ${id} failed`);
            return response.status(404).send({
                message: `Book ${id} not found`,
            });
        }

        console.log(`Book ${id} deleted successfully`);
        return response.status(200).json({
            message: 'Book deleted successfully',
            data: result
        }
        );

    }
    catch(error) {
        console.log(`Failed to delete book\n${error}`);
        response.status(500).send({
            message: 'Failed to delete the book',
            error: error.message
        });
    }
});

export default router;
