const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config()
const mysql = require('mysql2')
const bodyParser = require('body-parser')


app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// tao ket noi den database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1412",
    database: "crud",

    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
})

// if there is a auth problem
// alter user 'root'@'localhost' identified with mysql_native_password by '1412'

db.connect((err) => {
    if (err) {
        console.log("Loi ket noi den database! " + err.stack);
    } else {
        console.log("Ket noi thanh cong den database");
    }
})

app.get('/', (req, res) => {
    res.json('Hello express')
})

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`,`descr`,`cover`,`price`) VALUES (?)";
    // const values = ["title from backend", "descr from backend", "cover pic from backend"];
    const values = [req.body.title, req.body.descr, req.body.cover, req.body.price];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete('/books/:id', (req, res) => {
    const q = "DELETE FROM books WHERE id = ?";
    const bookId = req.params.id

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put('/books/:id', (req, res) => {
    const q = "UPDATE books SET `title` = ?,`descr`=?,`cover`=?,`price`=? WHERE id =?"
    const bookId = req.params.id;
    const values = [req.body.title, req.body.descr, req.body.cover, req.body.price];
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(1412, () => {
    console.log("Connected to backend! 1");
})