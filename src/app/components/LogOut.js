'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogOut = () => {
    const router = useRouter();

    // Log Out User
    const logOut = () => {
        localStorage.setItem('token', JSON.stringify(""));
        router.push('/login');
    }

    return (
        <div className='flex flex-row justify-end items-center mr-14 mt-10 xl:mt-20'>
            <Image src='/assets/logOut.png' width={40} height={100} className='mx-4 cursor-pointer w-auto h-auto' alt='logout' />
            <button className='font-futura-md-bt underline' onClick={logOut}>LogOut</button>
        </div>
    )
}

export default LogOut