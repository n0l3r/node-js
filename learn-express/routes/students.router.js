const express = require('express');
const studentsController = require('../controllers/students.controller');
const studentsRouter = express.Router();

// Method GET /students
studentsRouter.get('/', studentsController.getStudents);
// Method GET /students/:id (get student by id)
studentsRouter.get('/:id', studentsController.getStudent);
// Method POST /students (create new student)
studentsRouter.post('/', studentsController.postStudent);

module.exports = studentsRouter;