import '../Form.css';
import { useForm } from "react-hook-form";
import { APIUser } from '../services/HttpUser';
import React, { useState } from "react";
import { Grid } from '@mui/material';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';


const LoginStudent = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  const [studentList, setStudentList] = useState([]);
  const [seeData, setSeeData] = useState(false);
  const [studentData, setStudentData] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate()
  // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  const { loginStudent, getAllStudentByClass, getAllStudent } = APIUser();
  const onSubmit = (data) => {
    loginStudent(data.tz, data.password).then(res => {
      console.log("res:",JSON.stringify(res.data[0]) );
      localStorage.setItem("student", JSON.stringify(res.data[0]));
      setStudentData(res.data);
      setSeeData(!seeData);
    });

  };

  useEffect(() => {

    // if (location.state.isManager) {
    //   getAllStudent().then(res => {
    //     localStorage.setItem("students", JSON.stringify(res.data));

    //   }).catch(err => {
    //     window.location.reload(true);

    //   })
    // }
    // else {
    //   getAllStudentByClass(JSON.parse(localStorage.getItem("teacher")).ClassPass).then(res => {
    //     localStorage.setItem("students", JSON.stringify(res.data));

    //   }).catch(err => {
    //     window.location.reload(true);

    //   })

    // }

  }, [])



  return (
    <>
      <form dir='rtl' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} columns={16}>
          <Grid xs={4}><label>תעודת זהות:</label></Grid>
          <Grid xs={10}><input {...register("tz", { pattern: /[0-9]{9}/, required: true, maxLength: 9, minLength: 9 })} type="password" color='pink' /></Grid>
          <Grid xs={14}>{errors.tz && <p className='errorLabel'>{"An ID card must be exactly 9 digits long"}</p>}</Grid>
        </Grid>
        <Grid container spacing={2} columns={16}>
          <Grid xs={4}><label>סיסמה:</label></Grid>
          <Grid xs={10}><input {...register("password", { required: true })} type="text" /></Grid>
          <Grid xs={14}>{errors.password && <p className='errorLabel'>{"required"}</p>}</Grid>
        </Grid>
        <input type="submit" className='specialButton' value={"צפייה"} />
      </form>

      {
        seeData && studentData && <Grid container spacing={2} columns={12} sx={{ marginTop: "50px" }}>
          <Grid xs={5}>
            <ol dir='rtl'>
              {Object.values(studentData).map((line, index) => <li key={index}><strong>בתאריך:</strong> {line.BehaviorDate.slice(0, 10)} <strong>קיבל דירוג: </strong>{line.BehavId}</li>)}
            </ol>
          </Grid>
          <Grid xs={2}></Grid>
          <Grid xs={2} dir='rtl' sx={{ color: "white" }}>
            <pre><strong>שם התלמיד: </strong> {studentData[0].StudName}</pre>
            <pre><strong>תעודת זהות: </strong> {studentData[0].StudTZ}</pre>
            <pre><strong>כתובת: </strong> {studentData[0].StudAddress}</pre>
            <pre><strong>טלפון:</strong>  {studentData[0].StudPhone}</pre>
            <pre><strong>מייל:</strong>  {studentData[0].StudMail}</pre>
          </Grid>
        </Grid>
      }
    </>

  );
}

export default LoginStudent;
