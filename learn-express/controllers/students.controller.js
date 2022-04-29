const studentsModel = require('../models/students.model');

function getStudents(req, res){
    res.json(studentsModel);
} 

function getStudent(req, res){
    var studentId = Number(req.params.id) - 1;
    if(studentId < studentsModel.length){
        res.status(200).json(studentsModel[studentId]);
    } else{
        res.status(404).json({
            "error": "Student not found"
        });
    }
}

function postStudent(req, res){
    if(!req.body.name || !req.body.age){
        return res.status(400).json({
            error: "Name and age are required"
        });
    }

    console.log(req.body);
    var newStudent = {
        "id": studentsModel.length + 1,
        "name": req.body.name,
        "age": req.body.age
    }
    studentsModel.push(newStudent);
    res.sendStatus(200);
}


module.exports = {
    getStudents,
    getStudent,
    postStudent
};