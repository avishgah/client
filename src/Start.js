import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const nav = useNavigate();

    return (<>
        <div className="App">
            <h1>ברוכים הבאים</h1>
            <Stack direction="row" spacing={2}>
                {/* <Button color="secondary">Secondary</Button> */}
                <Button variant="contained" color="success" onClick={() => nav('/Payment')} >
                    לקחת
                </Button>

                <Button variant="contained" color="success" onClick={() => nav('/Returns')}>
                    להחזיר
                </Button>
            </Stack>

        </div>
    </>
    )
}



export default Start;