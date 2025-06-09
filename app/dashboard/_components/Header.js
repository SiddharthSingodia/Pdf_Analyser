import React from 'react'
import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <div className='flex justify-end items-center p-4 shadow-sm'>
        <UserButton/>
    </div>
  )
}