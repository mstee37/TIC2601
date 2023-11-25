const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get admin List
        console.log('GET: /admin');
        models.Admin.findAll().then((admins) => {
            res.send(admins);
        })
    })
    .post((req, res) => { // to create admin details
        console.log('POST: /admin');
        var AID = req.body.AID;
        var AName = req.body.AName;

        models.Admin.create({ AID: AID, AName: AName}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update name
        console.log('PUT: /admin');

        var AID = req.body.AID;
        var AName = req.body.AName;

        models.Admin.findByPk(AID).then((admin) => {
            if (admin === null) {
                res.sendStatus(404);
            }
            else {
                admin.AName = AName;
                admin.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete admin
        console.log('DELETE: /admin?AID=' + req.query.AID);

        var AID = req.query.AID;

        models.Admin.findByPk(AID).then((admin) => {
            if (admin === null) {
                res.sendStatus(404);
            }
            else {
                admin.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
