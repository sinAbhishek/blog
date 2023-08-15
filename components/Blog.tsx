import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Blog:any = (prop:any) => {
const url=prop.blogs.image
const time:any=new Date(prop.blogs.time.seconds*1000)
const router=useRouter()
  return (
    <Link   href={{
      pathname: `/${prop.blogs.title}`,
      query: {
        search:`${prop.blogs.title}`
      }
    }}>
    
    <div  style={{maxWidth:"335px",minWidth:"250px"}}  className=" bg-red-100 w-1/3 h-1/2 bg-no-repeat bg-contain rounded-lg flex flex-col mx-4 hover:scale-105 transition duration-300 hover:cursor-pointer">
      <div className="w-full h-1/2 relative rounded-lg">
      {url&&<Image src={url} fill sizes='' alt='alt' style={{borderRadius:"8px 8px 0 0"}} />}
      </div>
      <div className=" m-2">
        <h4 className=' font-bold text-slate-900 text-lg'>{prop.blogs.title}</h4>
        <div className=" flex justify-between items-center px-2">
        <h6 className=' text-slate-700 text-sm font-semibold '>{prop.blogs.name}</h6>
        {time&&<h6 className='italic text-xs text-slate-700'>{time.toDateString()}</h6>}
        </div>
        <p className=' text-xs font-medium mt-2'>{prop.blogs.description.substring(0,150)} .....</p>
     
      </div>
     
    </div>
    </Link>
  )
}

export default Blog