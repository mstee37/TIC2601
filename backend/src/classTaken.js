const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get classTaken List
        console.log('GET: /classTaken');
        models.ClassTaken.findAll().then((classTakens) => {
            res.send(classTakens);
        })
    })
    .post((req, res) => { // to create classTaken details
        console.log('POST: /classTaken');
        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        var Feedback = req.body.Feedback;    

        models.ClassTaken.create({ StuID: StuID, ClsID: ClsID, Feedback:Feedback}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update classTakenInfo
        console.log('PUT: /classTaken');

        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        var Feedback = req.body.Feedback; 

        models.ClassTaken.findByPk(StuID,ClsID).then((classTaken) => {
            if (classTaken === null) {
                res.sendStatus(404);
            }
            else {
                classTaken.Feedback = Feedback;
                classTaken.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete classTaken
        console.log('DELETE: /classTaken?StuID=&ClsID=' + req.query.StuID + req.query.ClsID);

        var StuID = req.query.StuID;
        var ClsID = req.query.ClsID;

        models.ClassTaken.findByPk(StuID,ClsID).then((classTaken) => {
            if (classTaken === null) {
                res.sendStatus(404);
            }
            else {
                classTaken.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
