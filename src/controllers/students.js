const { errorMonitor } = require('events');
const express= require('express');
const mongoose= require('mongoose');

const Student= require('../models/studentdata.js');

const router= express.Router();

const getStudents = async (req, res) => {
    try {
        const student= await Student.find();
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const getStudentById = async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findOne({studentId: studentId});

        if (student === null) {
            res.status(404).json({});
        }
        else {
            res.status(200).json(student);
        }
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const getStudentByRoll = async (req,res) => {
    const roll = req.params.roll;

    try {
        const stud = await Student.find({roll: roll});

        res.status(200).json(stud);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}

const createstudent =  async (req, res) => {
    console.log(req.body);

    const crypto = require('crypto');

    const studentId = req.body.studentId ?? crypto.randomUUID();

    console.log("studentId: " + studentId);

    const newstudent = new Student({
        studentId: studentId,
        name:req.body.name,
        roll:req.body.roll,
        registration:req.body.registration,
        subjects:req.body.subjects,
    })

    console.log(newstudent);
    try {
        await newstudent.save();

        res.status(201).json(newstudent);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

}

const updatestudent = async (req, res) => {
    const roll= req.params.roll;
    try{
        await Student.findOneAndUpdate({
            roll: roll,
        },
        {   
            name:req.body.name,
            registration:req.body.registration,
            subjects:req.body.subjects,
            created_on:req.body.created_on
        }
        )
        res.status(202).json({roll: roll});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
    
}

const deletestudent = async (req, res) => {
    const roll= req.params.roll;

    try {
        await Student.findOneAndRemove({roll: roll});
        res.status(203).json({roll:roll});

    }catch(error) {
        res.status(402).json({message: error.message});
    }
}

module.exports.getStudents= getStudents;
module.exports.getStudentById= getStudentById;
module.exports.createstudent= createstudent;
module.exports.getStudentByRoll= getStudentByRoll;
module.exports.updatestudent= updatestudent;
module.exports.deletestudent= deletestudent;