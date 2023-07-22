import './Payment2.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


let namePic;
let r = "1.png";


const Change = () => {
    alert("ll")

    namePic = document.querySelector('input').value;
    console.log(namePic);
    r = namePic.substring(12);
    console.log(r)

}

const PicId = () => {

    return (<>
        <h1>תצלום תעודת זהות / דרכון</h1>

        <div id="div-pic">
            <Box
                component="img"
                sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                }}
                src={r}
            />
            
            <Button
            endIcon={ <AttachmentIcon /> }
                variant="contained"
                component="label"
                id="pid-button"
            >
                בחירת קובץ 
                  
                <input
                    type="file"
                    hidden
                />
            </Button>

        </div>

    </>)
}

export default PicId;



