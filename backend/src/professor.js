const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get professor List
        console.log('GET: /professor');
        models.Professor.findAll().then((professors) => {
            res.send(professors);
        })
    })
    .post((req, res) => { // to create professor details
        console.log('POST: /professor');
        var PID = req.body.PID;
        var PName = req.body.PName;

        models.Professor.create({ PID: PID, PName: PName}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update name
        console.log('PUT: /professor');

        var PID = req.body.PID;
        var Pname = req.body.Pname;

        models.Professor.findByPk(PID).then((professor) => {
            if (professor === null) {
                res.sendStatus(404);
            }
            else {
                professor.Pname = Pname;
                professor.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete professor
        console.log('DELETE: /professor?PID=' + req.query.PID);

        var PID = req.query.PID;

        models.Professor.findByPk(PID).then((professor) => {
            if (professor === null) {
                res.sendStatus(404);
            }
            else {
                professor.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
