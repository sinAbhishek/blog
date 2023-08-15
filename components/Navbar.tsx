import React, { useEffect, useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '@/app/firebase'
import Link from 'next/link'
const Navbar = () => {
    const [trigger,settrigger]=useState(true)
    const signout=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            settrigger(!trigger)
          }).catch((error) => {
            // An error happened.
          });
    }
    useEffect(()=>{

    },[trigger])
  return (
    <>
    <div style={{backgroundColor:"#009cfc"}} className='w-screen h-20 bg-cyan-400 flex justify-between items-center'>
        <div className=" ml-2"><Link href={"/"}><span className=' text-slate-200 font-semibold'>Home</span></Link></div>
       <div className=" mr-4 flex">
       {!auth.currentUser&&<div className="">
        <Link href={"/login"}><span className=' text-slate-200 font-semibold mr-2 bg-slate-800 p-2 rounded-md'>Login</span></Link>
        <Link href={"/register"}><span className=' text-slate-200 font-semibold mr-2 bg-slate-800 p-2 rounded-md'>Register</span></Link>
        </div>}
        {auth.currentUser&&<div  className="">
            <button className=' bg-red-600 text-white px-2 py-1 rounded-lg' onClick={signout}>
            Signout
            </button>
          
        </div>}
        </div>
   
    </div>
    
    <hr />
    </>
    
  )
}

export default Navbar