import { Box, Button, Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Introduc = () => {

    const nav = useNavigate();

    const currentStation = useSelector(state => state.r.station);

    return (<>
        {console.log(currentStation)}
        <div class="flex-container">
            <div class="flex-item-left" style={{ direction: "rtl", textAlign: "right", flex: "55%" }}>
                <div style={{ width: "70%", height: "50%", marginRight: "10%"}}>
                    <h2 style={{ textAlign: "right", fontSize: "25px", marginTop: "1.5%" }}>שלום,</h2>
                    <p id="pI" >ברוכים הבאים לרשת פדאל , רכיבה על אופניים תביא אתכם מהר יותר ליעדכם בצורה מהירה, בטוחה , ירוקה וזולה ותחסוך מכם את העמידה בפקקים וחיפוש חנייה.<br></br>
                        הרכיבה על אופניים מאפשרת גישה נוחה למקומות אליהם אין באפשרות רכבים פרטיים להגיע ומשפרת את הניידות בעיר.
                    </p>
                    <p id="gg" style={{ fontSize: "17px", color: "#602424" }}><b>בטיחותכם חשובה לנו אנא הקשיבו להוראות הבטיחות וסעו בזהירות ! כללי בטיחות</b></p>

                    <Box

                        component="img"
                        sx={{
                            marginBottom:"2%",
                            height: 100,
                            display: 'block',
                            src: "./Images/logo.jpg",
                            overflow: '40px',
                        }}
                        src='/saftyRulls.png'
                    />
                    <div style={{ direction: "rtl", fontSize: "13px", textAlign: "right", color: "white" }}>
                        נתקלתם בבעיה ? אנחנו פה לעזור !<br></br>
                        מוקד שירות לקוחות פדאל : 2670*<br></br>
                        מייל: PEDAL@gmail.com<br></br>
                        פנייה בפקס:03-7708598⁩<br></br>
                        פדאל תחבורה שיתופית בע”מ<br></br>
                    </div>

                    <br></br>
                    <Button class="button" style={{ textAlign: "center", marginTop: "-15%" }} onClick={() => nav('/Start')}><span class="arrow"></span>התחלה</Button>
                </div>
            </div>
            <div class="flex-item-right" style={{ flex: "45%" }}>
                <Box
                    component="img"
                    sx={{
                        marginTop: "30%",
                        marginLeft: "25%",
                        height: 300,
                        display: 'block',
                        // maxWidth: 50,
                        overflow: 'hidden',
                        width: '400px',
                    }}
                    // src={logo}
                    src='/logo2.png'
                />

                <div className='son'>
                    <br></br>
                 
                </div>


            </div >


        </div>



    </>)
}

export default Introduc;