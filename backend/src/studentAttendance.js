const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get studentAttendance List
        console.log('GET: /studentAttendance');
        models.StudentAttendance.findAll().then((studentAttendances) => {
            res.send(studentAttendances);
        })
    })
    .post((req, res) => { // to create studentAttendance details
        console.log('POST: /studentAttendance');
        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        var Date = req.body.Date;
        var Attendance = req.body.Attendance;        

        models.studentAttendance.create({ StuID: StuID, ClsID: ClsID, Date:Date, Attendance: Attendance}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update studentAttendanceInfo
        console.log('PUT: /studentAttendance');

        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        var Date = req.body.Date;
        var Attendance = req.body.Attendance;     

        models.StudentAttendance.findByPk(StuID,ClsID,Date).then((studentAttendance) => {
            if (studentAttendance === null) {
                res.sendStatus(404);
            }
            else {
                studentAttendance.Attendance = Attendance;
                studentAttendance.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete studentAttendance
        console.log('DELETE: /studentAttendance?StuID=&ClsID=&Date=' + req.query.StuID + req.query.ClsID + req.query.Date);

        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        var Date = req.body.Date;

        models.StudentAttendance.findByPk(StuID,ClsID,Date).then((studentAttendance) => {
            if (studentAttendance === null) {
                res.sendStatus(404);
            }
            else {
                studentAttendance.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
