"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { Userdetails } from '@/types';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Link from "next/link";
function Page() {
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
    <div className="w-screen h-screen bg-slate-800 flex justify-center items-center flex-col">
      <h1 className=" text-4xl text-white font-bold mb-8">Login</h1>
      <form action="" onSubmit={register} className="flex flex-col justify-center items-center bg-slate-950 w-1/2 h-60 rounded-md">
      <input className=" px-2 h-7 rounded-md my-4" type="email" id='email' onChange={change} placeholder="email" />
        <input className=" px-2 h-7 rounded-md my-4" type="password" id='password' onChange={change} placeholder="password" />
        <button className=' bg-green-300 px-2 rounded-md' type='submit'>Submit</button>
      </form>
 <h1 className=" text-white">  New user?<Link href="/register"><span className=" text-emerald-400">Register here</span></Link></h1>

    </div>
  )
}

export default Page