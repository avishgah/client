import './Payment2.css';
import AttachmentIcon from '@mui/icons-material/Attachment';

let namePic;
let r;


const Change=()=>{
    alert("ll")
   
   namePic= document.querySelector('input').value; 
   console.log(namePic); 
   r=namePic.substring(12);
   console.log(r)
}
 
 const PicId=()=>{

    return(<>
    <h1>תצלום תעודת זהות / דרכון</h1>

    <div id="div-pic"><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>


<AttachmentIcon/>
            <input type="file" onChange={()=>(Change())}></input>
    </div>

    <img src={r}></img>
    </>)
}

export default PicId;