const express = require("express");

const  student_Act = require("../controllers/students"); 

const router = express.Router();

router.get('/', student_Act.getStudents);
router.get("/:studentId", student_Act.getStudentById);
router.get('/roll/:roll', student_Act.getStudentByRoll);
router.post('/', student_Act.createstudent);
router.patch('/:roll', student_Act.updatestudent);
router.delete('/:roll', student_Act.deletestudent);

module.exports=router;