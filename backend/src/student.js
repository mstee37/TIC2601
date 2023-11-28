const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get student List
        console.log('GET: /student');
        models.Student.findAll().then((students) => {
            res.send(students);
        })
    })
    
    .post((req, res) => { // to create student details
        console.log('POST: /student');
        var SID = req.body.SID;
        var SCourseID = req.body.SCourseID;
        var SName = req.body.SName;
        var SBatch = req.body.SBatch;
        var SYear = req.body.SYear;
        var SStatus = req.body.SStatus;

        models.Student.create({ SID: SID, SCourseID: SCourseID, SName: SName, SBatch:SBatch, SYear:SYear, SStatus:SStatus}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update e.g. register course to update SCourse ID, amend SStatus for the enrolment status
        console.log('PUT: /student');

        var SID = req.body.SID;
        var SCourseID = req.body.SCourseID;
        var SName = req.body.SName;
        var SBatch = req.body.SBatch;
        var SYear = req.body.SYear;
        var SStatus = req.body.SStatus;

        models.Student.findByPk(SID).then((student) => {
            if (student === null) {
                res.sendStatus(404);
            }
            else {
                student.SCourseID = SCourseID;
                student.SName = SName;
                student.SBatch = SBatch;
                student.SYear = SYear;
                student.SStatus = SStatus;

                student.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete student
        console.log('DELETE: /student?SID=' + req.query.SID);

        var SID = req.query.SID;

        models.Student.findByPk(SID).then((student) => {
            if (student === null) {
                res.sendStatus(404);
            }
            else {
                student.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
