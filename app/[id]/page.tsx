"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Image from 'next/image';
import Update from '@/components/Update';
import { doc, setDoc, updateDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { db } from '../firebase';
import { useState } from 'react';
function page({searchParams}:any) {
  const [time,settime]=useState<any>()
  const [data,setdata]=useState<any>()
  const [open,setopen]=useState<boolean>(false)
  const handleClose = () => setopen(false);
  const [filter,setfilter]=useState<any>([])
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
  useEffect(()=>{
    const call=()=>{
      const result = data.filter((c:any) =>
      searchParams.search.toLowerCase() ===
      c.title.slice(0, searchParams.search.length).toLocaleLowerCase())
      settime(new Date(result[0]?.time.seconds*1000))
  setfilter(result)
  console.log(result)
    }
    data&&call()
 
  },[data])
  return (
    <div className='w-screen flex justify-center'>
      {filter[0]&&<div className=" w-10/12 h-max flex flex-col mt-8">
        <div className="w-full flex justify-center">
        <h1 className=' font-bold text-3xl text-slate-800'>{filter[0].title}</h1>
        </div>
        
        <div className=" flex justify-between items-center px-2">
          <div className="">
          <h6 className=' text-slate-700 text-md font-semibold '>{filter[0].name}</h6>
        {time&&<h6 className='italic text-sm text-slate-700'>{time.toDateString()}</h6>}
          </div>
     <div className="">
      <button onClick={()=>setopen(!open)} className=' bg-red-500'>Update</button>
      <button className=' bg-red-500'>Delete</button>
     </div>
        </div>
        <div className="w-full h-72 relative rounded-lg mt-4">
      <Image src={filter[0].image} fill sizes='' alt='alt' style={{borderRadius:"8px 8px 0 0"}} />
      </div>
      <p>{filter[0].description}</p>
      </div>}
      <Update on={open} close={handleClose} data={filter[0]}/>
    </div>
  )
}

export default page