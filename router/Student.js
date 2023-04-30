const express=require('express')
const router=express.Router()
const app=express()
const student=require('../controller/Student')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

router.get(`/getAllStudentByClass/:ClassPass`,student.GetAllStudentByClass);
router.get(`/getAllStudent`,student.GetAllStudent);
router.get(`/getStudentById/:id`,student.GetStudentById)
router.post('/addStudent',student.AddStudent);
router.delete(`/deleteStudent`,student.DeleteStudent);
router.get('/getStudentGragh',student.GetStudentGragh)



module.exports=router;