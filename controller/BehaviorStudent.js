const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());



const functions = {
    GetIdStudent: (req, res) => {
        let id =parseInt( req.params.id);
        try {
            con.query(`select  StudId  from  student 
            where StudTZ='${id}'
            group by(StudTZ);`
                , (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the details are not correct')
                    }
                    else {

                        res.send(result)

                    }
                })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    AddBehaviorToStudent: (req, res) => {

        try {
            let id = parseInt(req.params.id) ;
             let arr_b = ["Good", "Trying", "Standard", "Not Good"];
            let num = 1;
            let { dateB, behaviorId, numclass } = req.body;
            for (let i = 0; i < arr_b.length; i++) {
                if (arr_b[i] == behaviorId)
                    num = i;
            }

            console.log("reqqqqqq:" + req.body)

            con.query(`insert into studbehavior(BehaviorDate,StudId,BehavId,ClassPasss)
                values('${dateB}',${id},${num + 1},${numclass});`
                , (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the details are not correct')
                    }
                    else {

                        res.send(result)

                    }
                })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },




    GetAmountBadBehavior: (req, res) => {
        try {
            let id = req.params.id;
            con.query(`select count(s.BehavId) from student  t join studbehavior s on t.StudId=s.StudId
            where t.StudTZ='${id}'   
            group by s.BehavId
            having s.BehavId=3);`
                , (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the details are not correct')
                    }
                    else {

                        res.send(result)

                    }
                })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },


};

module.exports = functions;