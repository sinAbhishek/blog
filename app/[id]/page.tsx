"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function page({params}:{params:{id:string}}) {
  
  return (
    <div>
        <button onClick={()=>console.log(params)} className=' bg-green-300'>
            test
        </button>
    </div>
  )
}

export default page