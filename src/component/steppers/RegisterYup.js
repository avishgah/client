import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../store/actions/UserActions";
// import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormInput from "./FormInput/FormInput";
import Password from "./Password/Password";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Form } from "react-router-dom";

import * as types from "../../store/actions/actionType";
import { useRef } from "react";
import { Link, Stack } from "@mui/material";






const arr = [
    { lableName: "שם משתמש מלא", name: "Name", type: "text" },
    { lableName: "תעודת זהות", name: "Tz", type: "text" },
    { lableName: "תאריך לידה", name: "DateBirth", type: "date" },
    { lableName: "עיר", name: "toun", type: "text" },
    { lableName: "כתובת", name: "address", type: "text" },
    { lableName: "פלאפון", name: "Phon", type: "number" },
    { lableName: 'דוא"ל', name: "Mail", type: "mail" },
    { lableName: "סיסמא", name: "Password", type: "text" },
    // { lableName: "תצלום תעודת זהות", name: "img", type: "file" },
    { name: "ReadTerms", type: "checkbox", defaultValue: false }
];

const schema = yup.object({
    Name: yup.string().required("שדה זה חובה").min(4, 'השם אינו תקין'),
    Tz: yup.string()
        .matches(/^\d{9}$/, 'יש להזין מספר תעודת זהות חוקי בן 9 ספרות')
        .required('יש להזין מספר תעודת זהות'),
    Mail: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
    Phon: yup.string()
        .matches(/^(0\d|(\+|00)972[\-\s]?)?(50|52|53|54|55|58)?\d{10}$/, 'יש להזין מספר טלפון חוקי')
        .required('יש להזין מספר טלפון'),
    Password: yup.string().required("שדה זה חובה")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "הסיסמא חייבת להכיל 6 ספרות. לפחות מספר אחד.ולפחות אות אחת באנגלית."),
    DateBirth: yup.date()
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)), 'יש להיות בן 16 ומעלה')
        .typeError('יש להזין תאריך חוקי')
        .required('יש להזין תאריך לידה'),
    ReadTerms: yup.boolean().oneOf([true], 'יש לאשר את תנאי השימוש').required(),

}).required();


const RegisterYup = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        
    });
    const currentUser = useSelector(state => state.r.user);
    useEffect(() => {
        console.log("useEffect")
        if (currentUser != null) {
            // const u = {
            setValue("Name", currentUser.name)
            setValue("address", currentUser.address)
            setValue("Mail", currentUser.mail)
            setValue("Password", currentUser.password)
            setValue("toun", currentUser.toun)
            setValue("Phon", currentUser.phon)
            setValue("Tz", currentUser.tz)
            setValue("DateBirth", currentUser.dateBirth)
            setValue("Pic", currentUser.pic)
            setValue("IsManager", true)
            setValue("Status", true)
            setValue("ReadTerms", true)
        }
    }, [currentUser])
    const dispatch = useDispatch();





    const axiosServer = async (details, type) => {
        console.log(details, "details")
        if(currentUser){
            const user =
            {
                "Name": details.Name,
                "Address": details.address,
                "Mail": details.Mail,
                "Password": details.Password,
                "Toun": details.toun,
                "Phon": details.Phon,
                "Tz": details.Tz,
                "DateBirth": details.DateBirth,
                "Pic": details.Pic,
                "IsManager": false,
                "Status": details.Status,
                "ReadTerms": true
            }

            console.log(user)
            axios.put(`https://localhost:7207/api/User/UpdateUser/${currentUser.id}`, user).then(res => {
                console.log("kk");
                alert("עודכן בהצלחה");
              

                axios.get(`https://localhost:7207/api/user/GetUserById/${currentUser.id}`)
                .then(res => {
                    console.log(res.data)
                    onSubmit(res.data);
                    dispatch({type: type.CURRENT_USER, payload:res.data})
                    // nav('/NavB')
                }).catch(err => console.log(err))
            })
        }
        else{
        axios.post(`https://localhost:7207/api/user`, details).then(res => {
            console.log(res, "res");

            if (res.data == "") {
                alert("משתמש רשום במערכת")
                return null;
            }
            else {
                alert("נוסף בהצלחה");
                onSubmit(details);
                dispatch({ type: types.CURRENT_USER, payload: res.data })
            }

        }).catch(error => {
            console.log("משתמש קיים");
            console.error(error)
        })
    }

    }

    // פונקצית הרשמה
    // הפונקציה מתבצעת במידה וכל הנתונים שהוזנו בשדות עונים לדרישות הסכמה
    const submit = async (data) => {
        console.log(data)
        try {

            await schema.validate(data, { abortEarly: false }); // אימות עם Yup
            // פעולות נוספות במידת הצורך לאחר בדיקת תקינות מוצלחת
            await axiosServer(data, 'IsExist');
        } catch (errors) {
            console.log(errors);
        }


    };


    return (
        <form onSubmit={handleSubmit(submit)} className="formAdd">
            <br></br>
            <div id="div-details">פרטים אישיים</div>
            <br></br>
            {arr.map(item => <div key={item.name}>
                {
                    item.name !== "Password" ? (
                        <div>

                            <FormInput
                                lableName={item.name === "ReadTerms" ? (
                                    <a href='/page.txt' download>תקנון שימוש</a>
                                ) : (item.lableName)}
                                name={item.name}
                                type={item.type}
                                errors={errors}
                                register={register}
                                user={currentUser}
                                flag={false}

                            />
                        </div>
                    ) : (
                        <Password
                            errors={errors}
                            register={register}
                            name={"Password"}
                            labelName={"סיסמא"}
                        />
                    )
                }

            </div>
            )}

            <Stack direction="row" spacing={5} marginRight="22vw">
                {/* <Link
                    style={{ marginLeft: "20px", direction: "rtl" }}

                    component="button"
                    variant="body2"
                    onClick={() => {
                        navigate('/Connection')
                    }}
                >
                    משתמש רשום?
                </Link> */}
                <Button color="inherit" style={{ fontSize: "15px", fontWeight: "bold", backgroundColor: "#1976d2", color: "white", width: "125px" }} type="submit" textAlign="right">
                    הבא
                </Button>

            </Stack><br></br>


        </form>
    )
}
export default RegisterYup;