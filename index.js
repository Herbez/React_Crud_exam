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
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        res.json({ students: results });
    });
});

app.post('/api/create', (req, res) => {

    const { student_name, student_class } = req.body;

    const checkuser = 'SELECT * FROM student WHERE student_name = ?';

    db.query(checkuser, [student_name], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "Student already exists!" });
        }

        const sql = 'INSERT INTO student(student_name, student_class) VALUES(?,?)';

        db.query(sql, [student_name, student_class], (err) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: 'Student created !' });
        });

    });

});

app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM student WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted ' });
    });
});


app.get('/api/view/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM student WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        res.json(results[0]);
    });
});

app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const { student_name, student_class } = req.body;

    const sql = 'UPDATE student SET student_name = ?, student_class = ? WHERE id = ?';
    db.query(sql, [student_name, student_class, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.json({ message: "Student updated successfully" });
    });
});
