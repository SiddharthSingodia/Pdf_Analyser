import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Layout, Shield } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function SideBar() {
  return (
    <div className='shadow-sm h-screen'>
        <Image src={"/logo.svg"} alt="logo" width={120} height={120} />
    
    <div className='mt-10'>
        <Button className='w-full'>Upload PDF</Button>

        <div className='flex gap-2 items-center mt-10 hover:bg-slate-100 rounded-md p-2 cursor-pointer'>
          <Layout/>
          <h2>Workspace</h2>
        </div>
        <div className='flex gap-2 items-center mt-1 hover:bg-slate-100 rounded-md p-2 cursor-pointer'>
          <Shield/>
          <h2>Upgrade</h2>
        </div>
    </div>
    <div className='absolute bottom-10 w-[80%]'>
    <Progress value={33} className='w-full' />
    <p className='text-sm mt-1'>2 out of 5 pdf uploaded</p>
    <p className ='text-sm text-gray-400 mt-2'> Upgrade to upload</p>
    </div>
    </div>
  )
}  