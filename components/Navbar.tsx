import React from 'react'
import { auth } from '@/app/firebase'
import Link from 'next/link'
const Navbar = () => {
  return (
    <>
    <div style={{backgroundColor:"#009cfc"}} className='w-screen h-20 bg-cyan-400 flex justify-between items-center'>
        <div className=" ml-2"><Link href={"/"}><span className=' text-slate-200 font-semibold'>Home</span></Link></div>
       {auth.currentUser&&<div className=" mr-2">
        <Link href={"/login"}><span className=' text-slate-200 font-semibold'>Login</span></Link>
        <Link href={"/register"}><span className=' text-slate-200 font-semibold'>Register</span></Link>
        </div>}
    </div>
    
    <hr />
    </>
    
  )
}

export default Navbar