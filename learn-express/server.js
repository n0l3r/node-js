const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const students = [
    {
        "id": 1,
        "name": "Naufal Taufiq Ridwan",
        "age": 20,
    },
    {
        "id": 2,
        "name": "Naufal Angelos",
        "age": 21,
    },
    {
        "id": 3,
        "name": "Yasmine Nadia Putri",
        "age": 21,
    }
];

app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${elapsed}ms`);
});

// Method GET 
app.get('/', (req, res) => {
    res.send('<h1>Learn Express JS</h1>');
});


// Method GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// Method GET /students/:id (get student by id)
app.get('/students/:id', (req, res) => {
    var studentId = Number(req.params.id) - 1;
    if(studentId < students.length){
        res.status(200).json(students[studentId]);
    } else{
        res.status(404).json({
            "error": "Student not found"
        });
    }
});

// Method POST /students (create new student)
app.post('/students', (req, res) => {
    if(!req.body.name || !req.body.age){
        return res.status(400).json({
            error: "Name and age are required"
        });
    }

    console.log(req.body);
    var newStudent = {
        "id": students.length + 1,
        "name": req.body.name,
        "age": req.body.age
    }
    students.push(newStudent);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});