const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get course List
        console.log('GET: /courseEnrollment?SCourseID='+req.query.SCourseID);
        var CoruseID = req.query.SCourseID; 
        models.Student.findAll({
            where:{
                SCourseID:CoruseID,SStatus:null
            }
        }
        ).then((students) => {
            res.send(students);
        })
    })
    .post((req, res) => { //update
        console.log('POST: /courseEnrollment');
        var SID = req.body.SID;
        var SCourseID = req.body.SCourseID;
        var SName = req.body.SName;
        var SBatch=req.body.SBatch;
        var SYear=req.body.SYear;
        var SStatus = req.body.SStatus;
      
        models.Student
          .findOne({
            where: { SID: SID, SCourseID: SCourseID },
          })
          .then((studentstatus) => {
            if (studentstatus === null) {
              res.sendStatus(404);
            } else {
                studentstatus.SStatus = SStatus;
                var currentyr=new Date().getFullYear();
                studentstatus.SBatch= currentyr+"/"+ (currentyr+1)% 100;
                studentstatus.SYear=1;
                studentstatus.save().then(() => {
                res.sendStatus(200);
              });
            }
          });
      })

    module.exports = router;