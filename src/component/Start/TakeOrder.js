
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const TakeOrder = () => {
    const nav = useNavigate();
    return (<>

        <div class="flex-container">

            <div class="flex-item-left" style={{ direction: "rtl", flex: "60%" }}>
                <div ><br></br><br></br><br></br><br></br>
                    {/* <h2>איזו פעולה תרצו לבצע ?</h2> */}

                    {/* <Button color="secondary">Secondary</Button> */}
                    <Button variant="contained" color="success" onClick={() => nav('/Stepper')} >
                        לקיחה חד פעמית
                    </Button><br></br>

                    <Button variant="contained" color="success" onClick={() => nav('/Order')}>
                        הזמנה מראש
                    </Button>
                </div>

            </div>

            <div class="flex-item-right" style={{ flex: "40%" }} >
                <Box
                    component="img"
                    sx={{
                        marginTop: "30%",
                        marginLeft: "10%",
                        height: 300,
                        display: 'block',
                        overflow: 'hidden',
                        width: '400px',
                    }}
                    src='/logo2.png'
                />
                <div className="helpper"  style={{ marginTop: "14%" }} oonClick={() => nav('/introduc')} >
                    יציאה
                </div>


            </div>
        </div>

    </>)
}


export default TakeOrder;