const express = require('express');
const cors = require('cors')
const app = express();
const port = 3001;

//const dataInit = require('./dataInit');

app.use(cors())
app.use(express.json())

const user = require('./user') ;
app.use('/user', user);

const student = require('./student') ;
app.use('/student', student);

const admin = require('./admin') ;
app.use('/admin', admin);

const classes = require('./class') ;
app.use('/class', classes);

const classTaken = require('./classTaken') ;
app.use('/classTaken', classTaken);

const course = require('./course') ;
app.use('/course', course);

const modules = require('./modules') ;
app.use('/modules', modules);

const notification = require('./notification') ;
app.use('/notification', notification);

const Professor = require('./Professor') ;
app.use('/Professor', Professor);

const studentAttendance = require('./studentAttendance') ;
app.use('/studentAttendance', studentAttendance);

const Transcript = require('./Transcript') ;
app.use('/Transcript', Transcript);

app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});
