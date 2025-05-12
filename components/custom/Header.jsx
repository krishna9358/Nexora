import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { DocumentPlusIcon, HeartIcon } from '@heroicons/react/24/outline'
function Header() {
  return (
    <div className='flex justify-between items-center p-4 pt-0'>
            <Link href="/">

        <div className='p-4 flex gap-2 items-center'>
            {/* <Image src="/logo.png" alt="logo" width={100} height={100} />  */}
            <HeartIcon className='w-8 h-8 ' />
            <h1 className='text-2xl font-bold'>Nexora</h1>
        </div>
        </Link>

        <div className='p-2 flex gap-4'>
            <div className='flex gap-2 items-center bg-black rounded-md px-2 text-white '>
                <DocumentPlusIcon className='w-4 h-4' />
                <p className='text-sm'>Docs</p>
            </div>
            <Button>Connect Wallet</Button>
        </div>
    </div>
  )
}

export default Header