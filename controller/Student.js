const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());



const functions = {
    AddStudent: (req, res) => {
        try {
            console.log("body:",req.body)
            let { TZ, name, address, tel, mail, numclass } = req.body;
            con.query(`insert into student(StudTZ,StudName,StudAddress,StudPhone,StudMail,ClassPass) 
                values('${TZ}','${name}','${address}','${tel}','${mail}',${numclass});`
                , (err, result) => {
                    if (err) {
                        console.log("err:",err)
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

    //  רטים לגרף לכל התלמידים מחזיר ממוצע של התנהגות שלהם עם שם
    GetStudentGragh: (req, res) => {
        try {
            con.query(`select t.StudName,AVG( s.BehavId) as avgBehav from student t join studbehavior s on t.StudId=s.StudId
                group by t.StudId`, (err, result) => {
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
    GetStudentById: (req, res) => {
        try {
            
            let id = req.params.id;
            const query = ` select t.*,s.BehaviorDate,s.BehavId from student t left join studbehavior s on t.StudId=s.StudId
            where t.StudTZ=${id}`;
            console.log('gggggggg',query)
            con.query(query, (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(404).send('the details are not correct')
                }
                else {

                    res.send(result)
                    console.log("seccuss")

                }
            })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    //פרטים על הכיתה
    GetAllStudentByClass: (req, res) => {
        try {
            let ClassPass = parseInt(req.params.ClassPass);
            const query = `select t.*,s.BehaviorDate,s.BehavId from student t join studbehavior s on t.ClassPass=s.ClassPasss
            where ClassPass=${ClassPass}`;
            con.query(query, (err, result) => {

                if (err) {
                    res.status(404).send('the details are not correct')
                }
                
                res.send(result)
            })
        }
        catch {
            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    GetAllStudent: (req, res) => {
        try {
           
            const query = `select t.*,s.BehaviorDate,s.BehavId from student t join studbehavior s on t.ClassPass=s.ClassPasss
            `;
            con.query(query, (err, result) => {

                if (err) {
                    res.status(404).send('the details are not correct')
                }
                
                res.send(result)
            })
        }
        catch {
            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    DeleteStudent: (req, res) => {
        try {
            const id = req.body.id;
            console.log(id);
            if (id != NaN) {

                con.query(`delete from studbehavior
                where StudId=${id};`, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the members are not correct')
                    }
                    else
                        res.send(result)
                })
            }
        } catch (err) {
            console.log("delete from studbehavior table", err);
            res.sendStatus(500)
            res.send(err)
        }
        con.query(`delete from student
            where StudId=${id};`, (err, result) => {
            if (err) {
                res.status(404).send('the members are not correct')
            }
            else
                res.send(result)
        })
    },


};
module.exports = functions;