import Link from 'next/link'
import React from 'react'
import Lookup from '@/data/Lookup'
import Image from 'next/image'
function Footer() {
  return (
    <div>
        <div className='flex flex-row justify-end items-end gap-8 mt-14 mr-10 fixed bottom-6 right-0'>

                {Lookup.Socials.map((social) => (
                    <Link key={social.id} href={social.url}>
                        <Image src={social.icon} alt={social.title} width={30} height={30} className='cursor-pointer border rounded-full p-2' />
                    </Link>
                ))}

        </div>
    </div>
  )
}

export default Footer