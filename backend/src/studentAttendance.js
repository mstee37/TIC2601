const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get studentAttendance List
        console.log('GET: /studentAttendance?ProfID=&ClsID=&Date=' + req.query.ProfID + req.query.ClsID + req.query.Date);
        var ProfIDs = req.query.ProfID; 
        var ClsIDs = req.query.ClsID; 
        var Dates=req.query.Date;
        models.StudentAttendance.findAll({
            attributes: [
              'ClsID','StuID',[models.sequelize.literal('"Student"."SName"'), 'Name'],'Date','Attendance'],
            include: [{
                model: models.Classes,
                attributes: [],
                include: {
                  model: models.Module,
                  attributes: [],
                  where: { ProfID: ProfIDs },
                },
              },
              {
                model: models.Student,
                attributes: [],
              }
            ],
            where: {
              ClsID: ClsIDs,
              Date: Dates,
            },
            raw: true,
          })
          .then((classlist) => {
            console.log('Classlist:', classlist);
            if (classlist === null) {
                res.sendStatus(404);
            } else {
                res.send(classlist);
            }
        })
    })
    .post((req, res) => { //update
        console.log('POST: /studentAttendance?ProfID=' + req.query.ProfID);
      
        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        var Date = req.body.Date;
        var Attendance = req.body.Attendance;
      
        models.StudentAttendance
          .findOne({
            where: { StuID: StuID, ClsID: ClsID, Date: Date },
          })
          .then((studentAttendance) => {
            if (studentAttendance === null) {
              res.sendStatus(404);
            } else {
              studentAttendance.Attendance = Attendance;
              studentAttendance.save().then(() => {
                res.sendStatus(200);
              });
            }
          });
      })
    // .delete((req, res) => { //delete studentAttendance
    //     console.log('DELETE: /studentAttendance?StuID=&ClsID=&Date=' + req.query.StuID + req.query.ClsID + req.query.Date);

    //     var StuID = req.body.StuID;
    //     var ClsID = req.body.ClsID;
    //     var Date = req.body.Date;

    //     models.StudentAttendance.findByPk(StuID,ClsID,Date).then((studentAttendance) => {
    //         if (studentAttendance === null) {
    //             res.sendStatus(404);
    //         }
    //         else {
    //             studentAttendance.destroy().then(() => {
    //                 res.sendStatus(200);
    //             })
    //         }
    //     })
    // });


module.exports = router;


