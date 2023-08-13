"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { Userdetails } from '@/types';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
function page() {
  const [userDetails,setuserDetails]=useState<Userdetails>({
    email:"",
    password:""
})
const router =useRouter()
const change=(e:React.ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault();
  setuserDetails((prev)=>({...prev,[e.target.id]:e.target.value}))
}
const register=(e:React.FormEvent<HTMLFormElement>):void=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.push("/");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}


  return (
    <div>
      <form action="" onSubmit={register}>
      <input type="email" id='email' onChange={change}/>
        <input type="password" id='password' onChange={change} />
        <button className=' bg-red-800' type='submit'>Submit</button>
      </form>
 
        <button className=' bg-black' onClick={()=>console.log(userDetails)}> test</button>
  
    </div>
  )
}

export default page