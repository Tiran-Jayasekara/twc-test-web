'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import contactService from '@/services/contactService'
import LogOut from '@/app/components/LogOut'

const WelComePage = () => {
    const router = useRouter();
    const { checkUserContacts } = contactService();
    const [contactButton, setContactButton] = useState('contacts');

    useEffect(() => {
        checkContacts();
    }, [])

    {/* Check User already has contacts or not */ }
    const checkContacts = async () => {
        const resData = await checkUserContacts();
        if (resData.data.message === "No Token Provide") {
            console.log("No Token Provide");
        }
        else if (resData) {
            setContactButton(resData.data.message);

        } else {
            console.log("Error");
        }
    }

    return (
        <>
            <div className='flex flex-col bg-custom rounded-tr-[0px] h-screen text-white '>
                {/* Top Right Corner*/}
                <div className="absolute top-0 right-0">
                    <Image src='/assets/topRight.png' alt='topRight' width={200} height={100} className='w-auto h-auto' />
                </div>
                {/* Bottom Left Corner */}
                <div className="absolute bottom-0 left-0 rounded-tr-full">
                    <Image src='/assets/bottomLeft.png' alt='bottomLeft' width={200} height={100} className='w-auto h-auto' />
                </div>

                <div className='ml-72 mt-20'>
                    <Image src='/assets/Logo.png' width={80} height={70} alt='Logo' />
                    <p className='font-bold text-3xl'>contacts</p>
                    <p className='text-2xl'>portal</p>

                    <p className='text-white font-futura-md-bt font-bold text-[40px] mt-20 xl:mt-24'>Welcome,</p>
                    <p className='text-[25px] font-futura-md-bt font-normal'>
                        This is where your contacts will live. Click the button below <br></br> to add a new contact.</p>

                    {/* Check User already has contacts or not */}
                    {contactButton === "add New Contact" ? <button className='s border border-b-2 rounded-2xl px-6 py-1 mt-20' onClick={() => (router.push('/contacts'))}>Contacts</button> : <button className='s border border-b-2 rounded-2xl px-6 py-1 mt-20' onClick={() => (router.push('/contacts/new'))}>{contactButton}</button>}

                    <LogOut />
                </div>
            </div>
        </>
    )
}

export default WelComePage