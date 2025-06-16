'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
    const {user}=useUser()  
    const fileList=useQuery(api.fileStorage.GetUserFiles,{
        userEmail:user?.primaryEmailAddress?.emailAddress
    })
    console.log("fileList:",fileList)
    return (
        <div>
            <h1 className='text-3xl font-medium'>
                Workspace
            </h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                {fileList?.length>0?fileList?.map((file, index)=>(

                    <Link href={`/workspace/`+file.fileId } key={index}>

                    <div key={index} className='flex p-5 shadow-md rounded-md flex-col items-center justify-center border
                    hover:scale-105 transition-all duration-300'>
                        <Image src={'/pdf.png'} alt='file' width={70} height={70}/>
                        <h2 className='text-lg font-medium'>{file?.fileName}</h2>
                  
                    </div>
                    </Link>
                ))
                    :[1,2,3,4,5,6,7].map((item, index)=>(
                    <div className='bg-slate-200 rounded-md h-[100px] animate-pulse' key={index}></div>
                ))
            }
            </div>
        </div>
    )
}