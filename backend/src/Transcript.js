const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()

router.route('/')
    .get((req, res) => { // to get transcript List
        console.log('GET: /transcript')
        if (req.query.ProfID){
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
        }else{models.Transcript.findAll().then((transcripts) => {console.log('Fetched classes:', transcripts);
        if (transcripts === null) {
            res.sendStatus(404);
        } else {
            res.send(transcripts);
        }
        
        })
    }   
    })
   .post((req, res) => { //update
        console.log('POST: /transcript');
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
      // .post((req, res) => { // to create transcript details
      //     console.log('POST: /transcript');
      //     var StuID = req.body.StuID;
      //     var ModID = req.body.ModID;
      //     var Grade = req.body.Grade;
      
      //     // Retrieve the current year
      //     var TYear = new Date().getFullYear();
      
      //     models.Transcript.create({ StuID: StuID, ModID: ModID, Grade: Grade, TYear: TYear })
      //         .then(() => {
      //             res.sendStatus(200);
      //         })
      //         .catch(() => {
      //             res.sendStatus(400);
      //         });
      // })
    // .delete((req, res) => { //delete transcript
    //     console.log('DELETE: /transcript?StuID=&ModID=' + req.query.StuID + req.query.ModID);

    //     var StuID = req.body.StuID;
    //     var ModID = req.body.ModID;

    //     models.Transcript.findByPk(StuID,ModID).then((transcript) => {
    //         if (transcript === null) {
    //             res.sendStatus(404);
    //         }
    //         else {
    //             transcript.destroy().then(() => {
    //                 res.sendStatus(200);
    //             })
    //         }
    //     })
    // });


module.exports = router;

