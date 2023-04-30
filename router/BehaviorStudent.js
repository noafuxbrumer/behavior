const express=require('express')
const router=express.Router()
const app=express()
const behaviorStudent=require('../controller/BehaviorStudent')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

router.post(`/AddBehaviorToStudent/:id`,behaviorStudent.AddBehaviorToStudent);
router.get(`/GetAmountBadBehavior/:id`,behaviorStudent.GetAmountBadBehavior);
router.get('/GetIdStudent/:id',behaviorStudent.GetIdStudent);

module.exports=router;
