
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { auth } from '@/app/firebase';
import axios from 'axios';
import { db } from '@/app/firebase';
import { BlogDetails } from '@/types';
import { useRouter } from 'next/navigation';
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

const Update=(prop:any)=> {
    const [open, setOpen] = React.useState(false);
    const router=useRouter()
    const handleOpen = () => setOpen(true);
    const [file,setfile]=React.useState("")
    const [Image,setImage]=React.useState("")
    const user:any=auth.currentUser?.uid;
    const handleClose = () => setOpen(false);
    const cloud_name:string="dxz1nwfam"
    const preset_key:string="dfpytcaw"
    
    const [data,setdata]=React.useState<BlogDetails>("")
    const upload=async()=>{
        if(file){
            const formdata=new FormData();
            formdata.append('file',file)
            formdata.append('upload_preset',preset_key);
            const res=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formdata)
            console.log(res.data)
            setdata((prev)=>({...prev,image:res.data.secure_url,time:new Date(Date.now())}))
        }
        else{
            const frankDocRef = doc(db, "users", user);
            await setDoc(frankDocRef, {
              [data.blogid]: data,
          },{merge:true});
          prop.close()
          router.push("/")
        }
    }

    React.useEffect(()=>{
        setdata(prop.data)
    },[prop])

    React.useEffect(()=>{
      
      const call=async()=>{
        console.log(data)
        const frankDocRef = doc(db, "users", user);
        await setDoc(frankDocRef, {
          [data.title]: data,
      },{merge:true});
      console.log("success")
      prop.close()
      router.push("/")
      }
      prop.data&&data.image&&data.image!==prop.data.image&&call()
    },[data])

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault();
      setdata((prev)=>({...prev,[e.target.id]:e.target.value}));
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
   {data&&<div className=" flex flex-col justify-center items-center">

    <button className=' absolute right-0 text-black bg-white p-2 top-0 ' onClick={()=>prop.close()}> Close</button>
  <input className=' p-2 h-8 border border-slate-700 w-1/2 rounded-md my-4' id='title' value={data.title} type="text" onChange={handlechange} placeholder='Title'/>
  <input className=' p-2 h-8 border border-slate-700 w-1/2 rounded-md my-4' id='name' value={data.name} type="text" onChange={handlechange} placeholder='Your name'/>
  <textarea className=' p-2 h-24 border border-slate-700 w-1/2 rounded-md my-4' id='description' value={data.description} type="text" onChange={handlechange} placeholder='Content'/>
  <input className=' bg-slate-700 rounded-md' type="file" onChange={(e:any)=>setfile(e.target.files[0])} />
<button  onClick={upload} className=' bg-green-400 rounded-lg px-2 mt-4'>Submit</button>
    </div>}

  </Box>
</Modal>
    </div>
  )
}

export default Update;