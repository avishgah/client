import { Box, Button, Card } from "@mui/material";
import React from "react";


const Introduc = () => {

    return (<>
        <div class="flex-container">

            <div class="flex-item-left" style={{ direction: "rtl", textAlign: "right" }}>
                <div style={{ width: "70%", height: "50%", marginRight: "10%" }}>
                    <h2 style={{ textAlign: "right", fontSize: "35px", marginTop: "10%" }}>שלום,</h2>
                    <p id="pI" >ברוכים הבאים לרשת פדאל , רכיבה על אופניים תביא אתכם מהר יותר ליעדכם בצורה מהירה, בטוחה , ירוקה וזולה ותחסוך מכם את העמידה בפקקים וחיפוש חנייה.<br></br>
                        הרכיבה על אופניים מאפשרת גישה נוחה למקומות אליהם אין באפשרות רכבים פרטיים להגיע ומשפרת את הניידות בעיר.
                    </p><br></br>

                    <p style={{ fontSize: "20px", color: "orange" }}><b>בטיחותכם חשובה לנו אנא הקשיבו להוראות הבטיחות וסעו בזהירות !</b></p>
                    <br></br>

                    <div style={{ direction: "rtl", fontSize: "13px", textAlign: "right", color: "white" }}>
                        נתקלתם בבעיה ? אנחנו פה לעזור !<br></br>
                        מוקד שירות לקוחות פדאל : 2670*<br></br>
                        מייל: PEDAL@gmail.com<br></br>
                        פנייה בפקס:03-7708598⁩<br></br>
                        פדאל תחבורה שיתופית בע”מ<br></br>
                    </div>

                    <br></br>
                    <Button class="button" style={{ textAlign: "center", marginTop: "-10%" }}><span>התחלה</span></Button>
                </div>
            </div>
            <div class="flex-item-right" >
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
                    {/* <div style={{ marginLeft:"70%", backgroundColor: "#4c809e", borderRadius: "150px" ,height:"150px",width:"150px"}}></div><br></br>

                <div style={{ marginLeft:"57%", backgroundColor: "#4c809e", borderRadius: "100px" ,height:"100px",width:"100px"}}></div><br></br>

                <div style={{ marginLeft:"68%", backgroundColor: "#4c809e", borderRadius: "125px" ,height:"125px",width:"125px"}}></div> */}


                </div>


            </div >


        </div>



    </>)
}

export default Introduc;