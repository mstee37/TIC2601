const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get course List
        console.log('GET: /course');
        models.Course.findAll().then((courses) => {
            res.send(courses);
        })
    })
    .post((req, res) => { // to create course details
        console.log('POST: /course');
        var CourseID = req.body.CourseID;
        var CourseName = req.body.CourseName;
        var CourseTotalMC = req.body.CourseTotalMC;
        var CourseDescription = req.body.CourseDescription;        

        models.Course.create({ CourseID: CourseID, CourseName: CourseName, CourseTotalMC:CourseTotalMC, CourseDescription: CourseDescription}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update courseInfo
        console.log('PUT: /course');

        var CourseID = req.body.CourseID;
        var CourseName = req.body.CourseName;
        var CourseTotalMC = req.body.CourseTotalMC;
        var CourseDescription = req.body.CourseDescription;     

        models.Course.findByPk(CourseID).then((course) => {
            if (course === null) {
                res.sendStatus(404);
            }
            else {
                course.CourseName = CourseName;
                course.CourseTotalMC = CourseTotalMC;
                course.CourseDescription = CourseDescription;
                course.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete course
        console.log('DELETE: /course?CourseID=' + req.query.CourseID);

        var CourseID = req.query.CourseID;
        //http://localhost:3001/course?CourseID=TIC2001
        models.Course.findByPk(CourseID).then((course) => {
            if (course === null) {
                res.sendStatus(404);
            }
            else {
                course.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
