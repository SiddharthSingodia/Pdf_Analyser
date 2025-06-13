import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
export default function WorkspaceHeader() {
  return (
    <div className='flex justify-between p-4 shadow-sm'>
        <Image src={'/logo.svg'} alt='logo' width={100} height={100}/>
        <UserButton/>
    </div>
  )
}