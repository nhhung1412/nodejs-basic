import React, { useState } from 'react'
import "../style/Add.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export const Update = () => {
    const [books, setBooks] = useState({
        title: '',
        descr: '',
        price: null,
        cover: ''
    })
    const navigate = useNavigate()
    const params = useParams()
    const bookId = params.id
    const handleChange = (e) => {
        setBooks(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:1412/books/${bookId}`, books)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Update Books</h1>
            <div className='form' >
                <input type="text" placeholder='title' onChange={handleChange} name='title' />
                <input type="text" placeholder='descr' onChange={handleChange} name='descr' />
                <input type="number" placeholder='price' onChange={handleChange} name='price' />
                <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
                <button type='submit' className='btn update' onClick={handleSubmit}>Submit</button>
            </div>
        </div >
    )
}
