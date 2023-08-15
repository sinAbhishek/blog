import React from 'react'

const Blog:any = (prop:any) => {


  return (
    <div style={{backgroundImage:`url(${prop.blogs.image})`}} className=" w-1/3 h-1/3 bg-no-repeat bg-contain">

    </div>
  )
}

export default Blog