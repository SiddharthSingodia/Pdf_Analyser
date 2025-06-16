import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
export default function WorkspaceHeader({fileName}) {
  return (
    <div className='flex justify-between p-4 shadow-sm'>
        <Image src={'/logo.svg'} alt='logo' width={100} height={100}/>
        <h1 className='text-2xl font-bold'>{fileName}</h1>
        <div className='flex items-center gap-2'>
          <Button variant={'outline'}>
            Save 
          </Button>
          <UserButton/>
        </div>
      
    </div> 
  )
}