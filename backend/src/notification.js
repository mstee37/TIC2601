const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get notification List
        console.log('GET: /notification');
        models.Notification.findAll().then((notifications) => {
            res.send(notifications);
        })
    })
    .post((req, res) => { // to create notification details
        console.log('POST: /notification');
        //var NotID = req.body.NotID;
        // var DateTime = req.body.DateTime;
        var CourseID = req.body.CourseID;
        var Message = req.body.Message;      

        models.Notification.create({ CourseID : CourseID, Message: Message}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update notificationInfo
        console.log('PUT: /notification');

        var NotID = req.body.NotID;
        // var DateTime = req.body.DateTime;
        var Message = req.body.Message;

        models.Notification.findByPk(NotID).then((notification) => {
            if (notification === null) {
                res.sendStatus(404);
            }
            else {
                notification.Message = Message;
                notification.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => { //delete notification
        console.log('DELETE: /notification?NotID=' + req.query.NotID);

        var NotID = req.query.NotID;

        models.Notification.findByPk(NotID).then((notification) => {
            if (notification === null) {
                res.sendStatus(404);
            }
            else {
                notification.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;
