const express = require('express');
const cors = require('cors');
const mysql = require("mysql2");
const port = 5000;

const app = express(); 
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_2'
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Database Connected");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.get('/api/viewstud', (req, res) => {
    const sql = 'SELECT * FROM student';

    db.query(sql, (err, results) => {
        if (results.length == 0) {
            return res.status(400).json({ message: "No student Student" });
        } else {
            res.json({ students: results });
        }

    });
});