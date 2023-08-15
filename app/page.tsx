"use client"

import Image from 'next/image'
import Create from '@/components/Create';
import Blog from '@/components/Blog';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import Navbar from '@/components/Navbar';


export default function Home() {
  const [open,setopen]=useState(false)
  const handleClose = () => setopen(false);
  const [data,setdata]=useState<any>()
    useEffect(()=>{

      const call=async ()=>{
        const q = query(collection(db, "users"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const array:any=[]
          querySnapshot.forEach((doc) => {
            Object.values(doc.data()).forEach((c)=>array.push(c))
        
            // array.push(doc.data());
              console.log({id:doc.id,...doc.data()});
          });
          setdata(array)
        });

      };
        
        
        // To update age and favorite color
      call();

    },[])

    const signout=()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
    const update=async()=>{
      console.log(data)
    //   await setDoc(frankDocRef, {
    //     name: "Frank",
    //     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    //     age: 12
    // });
    //   await updateDoc(frankDocRef, {
    //    y:"hf"
    // });
    }
  return (
    <main className="w-screen h-max">
      <Navbar/>
      <div style={{backgroundColor:"#009cfc"}} className=" search w-screen h-32 bg-emerald-300 flex justify-center items-center">
    <input className=' rounded-full text-sm text-slate-700 h-10 p-4 w-1/3 ' type="text" name="" id="" placeholder=' Search for blogs' />
      </div>
     <div className='w-screen h-screen flex relative'>
      <button onClick={()=>setopen(!open)} className=' bg-violet-300 absolute right-0 top-4 mr-8'> Create Blog</button>
      <div className=" mt-28 flex w-full">
      {data&&data.map((c:any)=>  <Blog blogs={c}/>)}
      </div>
     </div>
     <Create on={open} close={handleClose}/>
     <button className=' bg-black' onClick={update}> hello</button>
      <button className=' bg-red-600' onClick={signout}> hello</button>
    </main>
  )
}
