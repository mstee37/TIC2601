const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get transcript List
        console.log('GET: /transcript');
        models.Transcript.findAll().then((transcripts) => {
            res.send(transcripts);
        })
    })
    .post((req, res) => { // to create transcript details
        console.log('POST: /transcript');
        var StuID = req.body.StuID;
        var ModID = req.body.ModID;
        var Grade = req.body.Grade;
        //var TYear = new Date().getFullYear();  

        }).then(() => {
        models.Transcript.create({ StuID: StuID, ModID: ModID, Grade:Grade}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update transcriptInfo
        console.log('PUT: /transcript');

        var StuID = req.body.StuID;
        var ModID = req.body.ModID;
        var Grade = req.body.Grade;
        var TYear = req.body.TYear;     

        models.Transcript.findByPk(StuID,ModID).then((transcript) => {
            if (transcript === null) {
                res.sendStatus(404);
            }
            else {
                var Grade = req.body.Grade;
                transcript.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete transcript
        console.log('DELETE: /transcript?StuID=&ModID=' + req.query.StuID + req.query.ModID);

        var StuID = req.body.StuID;
        var ModID = req.body.ModID;

        models.Transcript.findByPk(StuID,ModID).then((transcript) => {
            if (transcript === null) {
                res.sendStatus(404);
            }
            else {
                transcript.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
