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
    .get((req, res) => { // to get classTaken List with student ID
        console.log('GET: /classTaken?StuID=' + req.query.StuID);
        var StuID = req.query.StuID;
        models.ClassTaken.findOne({ where: { StuID: StuID } }).then((classTaken) => {
            if (classTaken === null) {
                res.sendStatus(404);
            } else {
                res.send(classTakens);
            }
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
    .put((req, res) => { // to update to fill up the feedback using student ID in the URL
        console.log('PUT: /classTaken?StuID=' + req.query.StuID);
        var StuID = req.query.StuID;
        var ClsID = req.body.ClsID;
        var Feedback = req.body.Feedback; 
        models.ClassTaken.findOne({ where: { StuID: StuID } }).then((classTaken) => {
            if (classTaken === null) {
                res.sendStatus(404);
            } else {
                models.ClassTaken.findOne({ where: { ClsID: ClsID } }).then((classTaken) => {
                    if (classTaken === null) {
                        res.sendStatus(404);
                    } else {
                        classTaken.Feedback = Feedback;
                        classTaken.save().then(() => {
                            res.sendStatus(200);
                        })
                    }
                })
            }
        })

    })
    
    // .put((req, res) => { // to update to fill up the feedback
    //     console.log('PUT: /classTaken?StuID=' + req.query.StuID);
    //     var StuID = req.query.StuID;
    //     var ClsID = req.body.ClsID;
    //     var Feedback = req.body.Feedback; 
    
    //     models.ClassTaken.findOne({ where: { StuID: StuID, ClsID: ClsID } }).then((classTaken) => {
    //         if (classTaken === null) {
    //             res.sendStatus(404);
    //         } else {
    //             classTaken.Feedback = Feedback;
    //             classTaken.save().then(() => {
    //                 res.sendStatus(200);
    //             }).catch((error) => {
    //                 console.error('Error updating classTaken:', error);
    //                 res.sendStatus(500); // Send an internal server error status
    //             });
    //         }
    //     }).catch((error) => {
    //         console.error('Error finding classTaken:', error);
    //         res.sendStatus(500); // Send an internal server error status
    //     });
    // })

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
