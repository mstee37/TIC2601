const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get class List
        console.log('GET: /class');
        models.Classes.findAll().then((classes) => {
            res.send(classes);
        })
    })
    .post((req, res) => { // to create class details
        console.log('POST: /Classes');
        console.log(req.body)
        var CID = req.body.CID;
        var ModID = req.body.ModID;    
        var RoomNo = req.body.RoomNo;
        var StartDate = req.body.StartDate;
        var EndDate = req.body.EndDate;   
        models.Classes.create({ CID: CID, RoomNo: RoomNo, ModID:ModID, StartDate: new Date(StartDate), EndDate: new Date(EndDate)}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update classInfo
        console.log('PUT: /class');

        var CID = req.body.CID;  
        var RoomNo = req.body.RoomNo;
        var StartDate = req.body.StartDate;
        var EndDate = req.body.EndDate; 

        models.Classes.findByPk(CID).then((classes) => {
            if (classes === null) {
                res.sendStatus(404);
            }
            else {
                classes.RoomNo = RoomNo;
                classes.StartDate = StartDate;
                classes.EndDate = EndDate;
                classes.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete class
        console.log('DELETE: /class?CID=' + req.query.CID);

        var CID = req.query.CID;

        models.Classes.findByPk(CID).then((classes) => {
            if (classes === null) {
                res.sendStatus(404);
            }
            else {
                classes.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
