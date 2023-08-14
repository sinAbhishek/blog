
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { BlogDetails } from '@/types';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Create=()=> {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [file,setfile]=React.useState("")
    const [Image,setImage]=React.useState("")
    const handleClose = () => setOpen(false);
    const cloud_name:string="dxz1nwfam"
    const preset_key:string="dfpytcaw"
    const [data,setdata]=React.useState<BlogDetails>({
      title:"",
      name:"",
      description:"",
      image:"",
      time:""
    })
    const upload=async()=>{
      const formdata=new FormData();
      formdata.append('file',file)
      formdata.append('upload_preset',preset_key);
      const res=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formdata)
      console.log(res.data)
      setImage(res.data.secure_url)
    }

    React.useEffect(()=>{
      const call=()=>{
        setdata((prev)=>({...prev,image:Image,time:new Date(Date.now())}))
      }
      Image&&call()
    },[Image])

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault();
      setdata((prev)=>({...prev,[e.target.id]:e.target.value}));
    }
  return (
    <div>
        <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <input id='title' type="text" onChange={handlechange}/>
  <input id='description' type="text" onChange={handlechange}/>
  <input id='name' type="text" onChange={handlechange}/>
  <input type="file" onChange={(e:any)=>setfile(e.target.files[0])} />
<button onClick={upload} className=' bg-red-300'>  adsd</button>
  </Box>
</Modal>
    </div>
  )
}

export default Create;