import mongoose from "mongoose";

//Creating a book schema (a JSON object that defines the structure and contents of your data)
const bookSchema = mongoose.Schema(
    //defining an object of fields
    {
        //options of object
        title: {
            type: String, 
            required: true
        },
        author: {
            type: String, 
            required: true
        },
        publishYear: {
            type: Number, 
            required: true
        }
    },

    //Adding timestamps of creation and last update
    {
        timestamps: true
    }

);


export const Book = mongoose.model('Book', bookSchema);