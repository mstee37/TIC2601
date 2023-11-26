const express = require('express');
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        console.log('GET: /registerCourse');
        models.registerCourse.findAll().then((registrations) => {
            res.send(registrations);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    })
    .post((req, res) => {
        console.log('POST: /registerCourse');
        const { CourseName, StudentName } = req.body;

        models.registerCourse.create({ CourseName, StudentName })
            .then(() => {
                res.sendStatus(200);
            }).catch(err => {
                console.error(err);
                res.sendStatus(400);
            });
    })
    .put((req, res) => {
        console.log('PUT: /registerCourse');
        const { CourseName, StudentName } = req.body;

        models.registerCourse.findOne({ where: { CourseName, StudentName } })
            .then((registration) => {
                if (registration) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }).catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
    })
    .delete((req, res) => {
        console.log('DELETE: /registerCourse');
        const { CourseName, StudentName } = req.query;

        models.registerCourse.destroy({ where: { CourseName, StudentName } })
            .then(() => {
                res.sendStatus(200);
            }).catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
    });

module.exports = router;
