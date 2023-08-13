"use client"

import React, { useState } from 'react'
import { Userdetails } from '@/types';
import { db } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { auth } from '../firebase';
function page() {
  const [userDetails,setuserDetails]=useState<Userdetails>({
    email:"",
    password:""
})
const change=(e:React.ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault();
  setuserDetails((prev)=>({...prev,[e.target.id]:e.target.value}))
}
const register=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setDoc(doc(db, "users", user.uid), {
  });
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
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