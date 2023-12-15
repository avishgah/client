import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './GetBike.css';
const GetBike=()=>{
    const [count, setCount] = React.useState(1);


    return(<>
    <div>
    <h1 id="h1">שלום, הנכם נמצאים בתחנת : </h1>

    <div><b>מספר אופניים להשכרה </b></div><br></br>

          <Box>
            <div>
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>

                <div id="p2">{count}</div>

                <Button
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>
</Box>
    </div>

    </>)
}

export default GetBike;