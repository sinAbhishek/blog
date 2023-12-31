
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { auth } from '@/app/firebase';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { db } from '@/app/firebase';
import "./modal.css"
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

const Create=(prop:any)=> {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [file,setfile]=React.useState("")
    const [Image,setImage]=React.useState("")
    const user:any=auth.currentUser?.uid;
    const handleClose = () => setOpen(false);
    const cloud_name:string="dxz1nwfam"
    const preset_key:string="dfpytcaw"
    
    const [data,setdata]=React.useState<BlogDetails>({
      title:"",
      name:"",
      description:"",
      image:"",
      time:"",
      userid:"",
      blogid:""
    })
    const upload=async()=>{
      const formdata=new FormData();
      formdata.append('file',file)
      formdata.append('upload_preset',preset_key);
      const res=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formdata)
      console.log(res.data)
      setdata((prev)=>({...prev,image:res.data.secure_url,time:new Date(Date.now()),blogid:uuidv4()}))
    }

    React.useEffect(()=>{
console.log(uuidv4())
    },[data])

    React.useEffect(()=>{
      
      const call=async()=>{
        console.log(data)
        const frankDocRef = doc(db, "users", user);
        await setDoc(frankDocRef, {
          [data.blogid]: data,
      },{merge:true});
      prop.close();
      console.log("success")
      }
      data.image&&call()
    },[data.image])

    const handlechange=(e:any)=>{
      e.preventDefault();
      setdata((prev)=>({...prev,[e.target.id]:e.target.value,userid:user}));
    }
  return (
    <div>
<Modal
  open={prop.on}
  onClose={()=>prop.close()}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <div className=" flex flex-col justify-center items-center">
  <button className=' absolute right-0 text-black bg-white p-2 top-0 ' onClick={()=>prop.close()}> Close</button>
  <input className=' p-2 h-8 border border-slate-700 w-1/2 rounded-md my-4' id='title' type="text" onChange={handlechange} placeholder='Title'/>
  <input className=' p-2 h-8 border border-slate-700 w-1/2 rounded-md my-4' id='name' type="text" onChange={handlechange} placeholder='Your name'/>
  <textarea className=' p-2 h-24 border border-slate-700 w-1/2 rounded-md my-4' id='description' onChange={handlechange} placeholder='Content'/>
  <input className=' bg-slate-700 rounded-md' type="file" onChange={(e:any)=>setfile(e.target.files[0])} />
<button  onClick={upload} className=' bg-green-400 rounded-lg px-2 mt-4'>Submit</button>
  </div>


  </Box>
</Modal>
    </div>
  )
}

export default Create;