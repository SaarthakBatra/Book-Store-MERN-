import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    console.log(id);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`).then((response) => {
            setBook(response.data.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);
    console.log(`Data -> ${book._id}`);

    return (
        <div className='p-4'>
            <BackButton></BackButton>
            <h1 className='text-3xl my-4'>Book Details</h1>
        
            {loading ? (<Spinner></Spinner>) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-400'>Id</span>
                        <span className='text-grey-400'>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-400'>Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-400'>Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-400'>Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-400'>Created</span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-400'>Updated</span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ShowBook;