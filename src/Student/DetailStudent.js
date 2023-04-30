import "../Form.css"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import swal from 'sweetalert';
import { useEffect } from "react";
import { APIUser } from "../services/HttpUser";
import { TwentyZeroMp } from "@mui/icons-material";



//נכנסים לכאן עפי כניסה לתלמיד.הרשמה לתלמיד ורק כך מורשים להכנס לעמוד זה
function DetailStudent() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();
  const [studentData, setStudentData] = useState(false);
  const { addStudentDetails, getAmountBadBehavior ,getStudentById} = APIUser();
  const [tz, setTz] = useState("");

  const onSubmit = (data) => {
    let num=0;
    console.log(data)
    localStorage.setItem("studentDeitail", JSON.stringify(data.data))
    console.log(tz)
    getStudentById(tz).then(res => {
      
    
      localStorage.setItem("num",res.data[0]["StudId"]);
     
       }).catch(err => {
         window.location.reload(true);
         console.log(err);
 
       })  
      num=localStorage.getItem("num");
      console.log("num",num);
    addStudentDetails(num,data)
    
    swal({
      title: "Good job!",
      text: "הפרטים נוספו בהצלחה",
      icon: "success",
      button: "בסדר"
    });

    getAmountBadBehavior(tz).then(res => {
      console.log(res)
      if(res>20){
        swal({
          title: "Good job!",
          text: "יש לעקוב אחרי התנהגות התלמיד",
          icon: "success",
          button: "בסדר"
        });
      }

    }).catch(err => {
      window.location.reload(true);
      //console.log(err);

    })

  
  
   // window.location.reload(true);
 }

  useEffect(() => {

  },[])



  return (
    <>
      <form dir="rtl" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} columns={16}>
          <Grid xs={4}><label>ת.ז. תלמיד:</label></Grid>
          <Grid xs={10}><input type="password" {...register("tz", { pattern: /[0-9]{9}/, required: true, maxLength: 9, minLength: 9 })} color='pink' onChange={e => { setTz(e.target.value) }} /></Grid>
          <Grid xs={14}>{errors.tz && <p className="errorLabel">{"An ID card must be exactly 9 digits long"}</p>}</Grid>
        </Grid>
        <Grid container spacing={2} columns={16}>
          <Grid xs={4}><label>מספר כיתה:</label></Grid>
          <Grid xs={10}><input type="number" {...register("numclass", { required: true, min: 1 })} /></Grid>
        </Grid>
        <Grid container spacing={2} columns={16}>
          <Grid xs={4}><label>תאריך:</label></Grid>
          <Grid xs={10}><input type="datetime-local" {...register("dateB", { required: true })} color='pink' /></Grid>
        </Grid>
        <Grid container spacing={2} columns={16}>
          <Grid xs={4}><label>התנהגות:</label></Grid>
          <Grid xs={10}><input {...register("behaviorId", { required: true })} placeholder="בחר מהרשימה:" list="behaviorId" /></Grid>

        </Grid>

        <datalist id="behaviorId">
          <option>Good</option>
          <option>Trying</option>
          <option>Standard</option>
          <option>Not Good</option>
        </datalist >

        <input type="submit" className="specialButton" value={"הוספה"} />
      </form>
    </>

  );
}

export default DetailStudent;




