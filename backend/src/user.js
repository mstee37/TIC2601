const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/all')
    .get((req, res) => { // to get useraccount List
        console.log('GET: /user');
        models.UserAccount.findAll().then((users) => {
            res.send(users);
        })
    })

router.route('/')
    .get((req, res) => { // to get useraccount List
        // console.log('GET: /user');
        // models.UserAccount.findAll().then((users) => {
        //     res.send(users);
        // })

        console.log('GET: /user?UID='+req.query.UID);
        console.log(req.query.UID);
        var UIDs = req.query.UID;

        models.UserAccount.findByPk(UIDs).then((users)=> {
            if (users === null) {
                res.sendStatus(404);
            }
            else {
                res.send(users);
            }
        })
    })
    .post((req, res) => { // to create useraccount
        console.log('POST: /user');
        var UID = req.body.UID;
        var URole = req.body.URole;
        var UPassword = req.body.UPassword;
        var UEmail = req.body.UEmail;

        models.UserAccount.create({ UID: UID, URole: URole, UPassword: UPassword, UEmail:UEmail}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .put((req, res) => { // to update Upassword
        console.log('PUT: /user');

        var UID = req.body.UID;
        //var URole = req.body.URole;
        var UPassword = req.body.UPassword;
        //var UEmail = req.body.UEmail;

        models.UserAccount.findByPk(UID).then((user) => {
            if (user === null) {
                res.sendStatus(404);
            }
            else {
                //user.URole = URole;
                user.UPassword = UPassword;
                //user.UEmail = UEmail;
                user.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => {
        console.log('DELETE: /user?UID=' + req.query.UID);

        var UID = req.query.UID;

        models.UserAccount.findByPk(UID).then((user) => {
            if (user === null) {
                res.sendStatus(404);
            }
            else {
                user.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router;

