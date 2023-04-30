const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());



const functions = {
    AddTeacher: (req, res) => {

        try {

            console.log('add-teacher api',req.body)
            let { classNum, TZ, name, address, tel, mail } = req.body;
            con.query(`insert into teacher(TeachTZ,IsManager,TeachName,TeachAddress,TeachPhone,TeachMail,ClassPass) 
                values('${TZ}',1,'${name}','${address}','${tel}','${mail}',${classNum});`
            
                , (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the details are not correct')
                    }
                    else {
                        con.query(`insert into class(ClassPass) 
                            values(${classNum});`
                            , (err, result) => {
                                if (err) {
                                    console.log(err)
                                    res.status(404).send('the details are not correct')
                                }
                                else {

                                    res.send(result)

                                }
                            })

                        res.send(result)

                    }

                })

        }
        catch (err) {

            console.log("err send"+err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    GetTeacherById: (req, res) => {
        try {
            let id = parseInt(req.params.id);
            con.query(`select * from teacher
             where TeachId=${id}`, (err, result) => {
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
    UpdateTeacherForClass: (req, res) => {
        try {
            let id = parseInt(req.params.id);
            let { ClassPass } = req.body();
            con.query(`UPDATE teacher
        SET ClassPass=${ClassPass}
        WHERE  TeachId=${id};`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct')
                }
                else
                    res.send(result)
            });

        } catch (err) {
            console.log(err);
            res.sendStatus(500)
            res.send(err)
        }
    },
    GetAllTeachers: (req, res) => {
        try {

            con.query(`select * from teacher
                where ClassPass!=000`, (err, result) => {

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

    LoginManger: (req, res) => {
        try {
            let id = req.params.id;
            let isManager = req.params.isManager == true ? 1 : 0;
            console.log('isManager', isManager);
            const query = `select * from teacher where TeachTZ=${id} and IsManager=${isManager}`
            console.log('query is: ', query);
            con.query(query, (err, result) => {
                if (err) {
               
                    res.status(404).send('error: ' + err)
                }
                else if (result.length == 0) {
                    res.status(405).send('the details are not correct')
                }
                else {
                    //console.log("status 200",result);
                    res.send(result[0])

                    console.log("result", result)

                }
            })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    DeleteTeacher: (req, res) => {
        try {
            let id = req.params.id;
            con.query(`UPDATE teacher
            SET ClassPass=000
            WHERE  TeachId=${id};`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct')
                }
                else
                    res.send(result)
            });

        } catch (err) {
            console.log(err);
            res.sendStatus(500)
            res.send(err)
        }
    },

};



module.exports = functions;