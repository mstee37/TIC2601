const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()


router.route('/all')
    .get((req, res) => { // to get classTaken List
        console.log('GET: /classTaken');
        models.ClassTaken.findAll().then((classTakens) => {
            res.send(classTakens);
        })
    })

router.route('/')
    .get((req, res) => { // to get classTaken List with student ID
        console.log('GET: /classTaken');
        var StuID = req.body.StuID;
        models.ClassTaken.findOne({ where: { StuID: StuID } }).then((classTaken) => {
            if (classTaken === null) {
                res.sendStatus(404);
            } else {
                res.send(classTaken);
            }
        })
    })
    .post((req, res) => { // to create classTaken details
        console.log('POST: /classTaken');
        var StuID = req.body.StuID;
        var ClsID = req.body.ClsID;
        // var Feedback = req.body.Feedback;    

        models.ClassTaken.create({ StuID: StuID, ClsID: ClsID}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => {
        console.log('PUT: /classTaken');
        const StuID = req.body.StuID; // Access StuID from the request body
        const ClsID = req.body.ClsID; // Access ClsID from the request body
        const Feedback = req.body.Feedback;
    
        models.ClassTaken.findOne({ where: { StuID: StuID, ClsID: ClsID } })
            .then((classTaken) => {
                if (!classTaken) {
                    return res.status(404).send('ClassTaken not found');
                }
    
                classTaken.update({ Feedback: Feedback })
                    .then(() => {
                        res.sendStatus(200);
                    })
                    .catch((error) => {
                        console.error('Error updating classTaken:', error);
                        res.status(500).send('Error updating classTaken');
                    });
            })
            .catch((error) => {
                console.error('Error finding classTaken:', error);
                res.status(500).send('Error finding classTaken');
            });
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
