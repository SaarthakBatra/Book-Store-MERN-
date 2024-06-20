import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateBook from './pages/CreateBook.jsx';
import EditBook from './pages/EditBook.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import ShowBook from './pages/ShowBook.jsx';

const App = () => {
  return (
    // <div className='bg-red-400 text-white'>App</div>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/books/create' element={<CreateBook></CreateBook>}></Route>
      <Route path='/books/details/:id' element={<ShowBook></ShowBook>}></Route>
      <Route path='/books/edit/:id' element={<EditBook></EditBook>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook></DeleteBook>}></Route>
    </Routes>
  )
}

export default App