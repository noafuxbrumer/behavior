import axios from 'axios';

export const APIUser = (props) => {

    const login = (tz, password, isManager) => {
        return axios.get(`http://localhost:44319/index/teacher/loginManager/${tz}/${isManager}`)

    }
    const loginStudent = (tz, password) => {
        return axios.get(`http://localhost:44319/index/student/getStudentById/${tz}`);
    }

    const getDataForChart = () => {
        // const response =  axios.post(`https://localhost:44351/api/auth/getDataForChart`).then(res=>{
        //     alert(res)

        // }).catch((err)=>{
        //     alert(err, "we have error")
        // });
        // return response.data;

        //זה לא קריאה אמיתית
        var data = [
            { label: "שלום כהן", y: 1 },
            { label: "יהודה לוי", y: 2 },
            { label: "נתי חבשוש", y: 3 },
            { label: "פנחס בכר", y: 4 },
            { label: "ירחמיאל דנון", y: 1 },
            { label: "טוביה נקש", y: 4 },
            { label: "מיכה סבג", y: 3 },
            { label: "גדי שרייבר", y: 2 },
            { label: "אלי מארוקו", y: 4 },
            { label: "ראובן כגן", y: 1 },
            { label: "שמעון טוויל", y: 3 },
            { label: "לוי ירושלמי", y: 2 },
            { label: "יהודה שקרקה", y: 1 },
            { label: "יששכר מצגר", y: 4 },
            { label: "זבולון פרקש", y: 3 },
            { label: "אשר אבלס", y: 4 },
            { label: "זאב פרנקל", y: 1 },


        ];
        return data;
    }

    const addStudent = (data) => {
        axios.post("http://localhost:44319/index/student/addStudent", data).then((res) => {
            alert(res)
        }).catch((errors) => alert(errors, "this is a error"))
    }

    const addStudentDetails = (tz, data) => {
        return axios.post(`http://localhost:44319/index/behaviorStudent/AddBehaviorToStudent/${tz}`, data);

    }

    const addTeacher = (data) => {
        axios.post(`http://localhost:44319/index/teacher/addTeacher`, data).
            then(res => { alert(res) }).catch((errors) => {
                alert(errors, "we have error to register teacher")
            })
    }
    const getStudentById = (id) => {
        return axios.get(`http://localhost:44319/index/behaviorStudent/GetIdStudent/${id}`);
    }
    const removeTeacher = (tz,data) => {
        axios.get(`http://localhost:44319/index/teacher/deleteTeacher/${data.tz}`, data).
            then(res => { alert(res) }).catch((errors) => {
                alert(errors, "we have error to remove teacher")
            });
    }

    const removeStudent = (data) => {
        axios.delete(`http://localhost:44319/index/student/deleteStudent`, data).
            then(res => { alert(res) }).catch((errors) => {
                alert(errors, "we have error to remove student")

            });
    }

    const getDataForPie = (data) => {
        // const response =  axios.post(`https://localhost:44351/api/auth/getDataForPie`).then(res=>{
        //     alert(res)

        // }).catch((err)=>{
        //     alert(err, "we have error")
        // });
        // return response.data;

        //זה לא קריאה אמיתית
        var data = [
            { y: 3, label: "Health" },
            { y: 7, label: "Education" },
            { y: 5, label: "Career" },
            { y: 0, label: "Family" },
        ];
        return data
    }
    const getAmountBadBehavior = (data) => {
        return axios.get(`http://localhost:44319/index/behaviorStudent/GetAmountBadBehavior/${data}`)


    }

    const getAllStudentByClass = (classPass) => {
        return axios.get(`http://localhost:44319/index/student/getAllStudentByClass/${classPass}`);
    }
    const getAllStudent = () => {
        axios.get(`http://localhost:44319/index/student/getAllStudent`);
    }
    return { login, loginStudent, getAllStudent, getAllStudentByClass, getStudentById, getDataForChart, addStudent, addStudentDetails, addTeacher, removeTeacher, removeStudent, getAmountBadBehavior }
}