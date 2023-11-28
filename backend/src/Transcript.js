const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get transcript List
        console.log('GET: /transcript?ProfID=' + req.query.ProfID);
            var ProfIDs = req.query.ProfID;  
            if (req.query.ModID) {
                console.log('GET:/transcript?ProfID=&ModID=' + req.query.ProfID + req.query.ModID);
                var ModIDs=req.query.ModID;
                models.Transcript.findAll({
                    attributes:["StuID",[models.sequelize.literal('"Student"."SName"'), 'SName'],
                    "ModID",
                    "Grade",
                    "TYear"],
                    include: [{
                    model: models.Module,
                    where: { MID:ModIDs,ProfID: ProfIDs },
                    attributes:[],
                   
                    },{
                        model:models.Student,
                        attributes:[],
                    }]
                    
                    
                }).then((modulesgrades) => {
                    if (modulesgrades === null) {
                        res.sendStatus(404);
                    } else {
                        res.send(modulesgrades);
                    }
                })
                

            }else{
                models.Module.findAll({
                    
                    where: { ProfID: ProfIDs},
                    attributes:["MID","MName","ProfID"]
                }).then((modules) => {
                    console.log('Fetched classes:', modules);
                    if (modules === null) {
                        res.sendStatus(404);
                    } else {
                        res.send(modules);
                    }
                    
                })
                
            }
    })
    .post((req, res) => { //update
        console.log('POST: /transcript?ProfID=' + req.query.ProfID);
        var StuID = req.body.StuID;
        var ModID = req.body.ModID;
        var Grade = req.body.Grade;
        var TYear = req.body.TYear;
        models.Transcript
          .findOne({
            where: { StuID: StuID, ModID: ModID },
          })
          .then((transcripts) => {
            if (transcripts === null) {
              res.sendStatus(404);
            } else {
                transcripts.Grade = Grade;
                transcripts.save().then(() => {
                res.sendStatus(200);
              });
            }
          });
      })
module.exports = router;
