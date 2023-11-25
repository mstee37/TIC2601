const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get module List
        console.log('GET: /module');
        models.Module.findAll().then((modules) => {
            res.send(modules);
        })
    })
    .post((req, res) => { // to create module details
        console.log('POST: /module');
        console.log(req.body)
        var MID = req.body.MID;
        var MName = req.body.MName;
        var MCredit = req.body.MCredit;
        var Mterm = req.body.Mterm;        
        var MPreRequisite = req.body.MPreRequisite;   

        models.Module.create({ MID: MID, MName: MName, MCredit:MCredit, Mterm: Mterm, MPreRequisite:MPreRequisite}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update moduleInfo
        console.log('PUT: /module');

        var MID = req.body.MID;
        var MName = req.body.MName;
        var MCredit = req.body.MCredit;
        var Mterm = req.body.Mterm;   
        var MPreRequisite = req.body.MPreRequisite;     

        models.Module.findByPk(MID).then((module) => {
            if (module === null) {
                res.sendStatus(404);
            }
            else {
                module.MName = MName;
                module.MCredit = MCredit;
                module.Mterm = Mterm;
                module.MPreRequisite = MPreRequisite;
                module.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete module
        console.log('DELETE: /module?MID=' + req.query.MID);

        var MID = req.query.MID;

        models.Module.findByPk(MID).then((module) => {
            if (module === null) {
                res.sendStatus(404);
            }
            else {
                module.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
