import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../style/Books.css'

export const Book = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const data = await axios.get('http://localhost:1412/books')
                setBooks(data.data)
                console.log(books);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1412/books/${id}`)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Hung's Book Shop</h1>
            <div className='grid'>
                {
                    books.map(book => (
                        <div key={book?.id} className='books'>
                            {book.cover && <img src={book?.cover} alt='' />}
                            <h2>{book?.title}</h2>
                            <div>{book?.descr}</div>
                            <span>{book?.price}</span>
                            <button className='btn' onClick={() => handleDelete(book?.id)}>X</button>
                            <Link to={`/update/${book.id}`}><button className='btn update'>Update</button></Link >
                        </div>
                    ))
                }
            </div >
            <Link to="/add">
                <button className='btn'>
                    Add new books
                </button>
            </Link>
        </div>
    )
}
