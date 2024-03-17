'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import contactService from '@/services/contactService'
import { useRouter } from 'next/navigation'
import LogOut from '@/app/components/LogOut'


const addNewContact = () => {
    const router = useRouter();
    const [contactButtonMsg, setContactButton] = useState('add new contact')
    const [contactForm, setContactForm] = useState({
        fullName: "",
        email: "",
        number: "",
        gender: ""
    });
    const defaultForm = {
        fullName: "",
        email: "",
        number: "",
        gender: ""
    }
    const { addContact, checkUserContacts } = contactService();

    useEffect(() => {
        checkContacts();
    }, [])

    // Check User already has contacts or not 
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

    // Add New Contact
    const addNewContact = async () => {
        if (contactForm.fullName.trim() === "" || contactForm.email.trim() === "" || contactForm.number.trim() === "" || contactForm.gender.trim() === "") {
            alert("Please fill All Fields")
        }
        else {
            const resData = await addContact(contactForm);
            alert(resData.data.message);
            if (resData.data.message === "contact Add Successfull") {
                setContactForm(defaultForm);
                router.push('/contacts')
            } else {
                alert("contact Add Unsuccess")
            }
        }
    }


    return (
        <>
            <div className='flex flex-col bg-custom rounded-tr-[0px] h-screen text-white '>
                <div className="absolute top-0 right-0">
                    <Image src='/assets/topRight.png' priority={true} width={200} height={100} className='w-auto h-auto' alt='topRight' />
                </div>

                <div className="absolute bottom-0 left-0 rounded-tr-full">
                    <Image src='/assets/bottomLeft.png' priority={true} width={200} height={100} className='w-auto h-auto' alt='bottomLeft' />
                </div>

                <div className='ml-72 mt-20'>
                    <Image src='/assets/Logo.png' width={80} height={70} alt='logo' className='w-auto h-auto' />
                    <p className='font-bold text-3xl'>contacts</p>
                    <p className='text-2xl'>portal</p>

                    <p className='text-white font-futura-md-bt font-bold text-[34px] mt-14 xl:mt-24'>New Contact</p>


                    <div className='flex flex-row'>
                        {/* Add Full Name */}
                        <input type='text' value={contactForm.fullName}
                            onChange={(event) => {
                                setContactForm({
                                    ...contactForm,
                                    fullName: event.target.value,
                                })
                            }}
                            placeholder='full name' className='mt-10 w-[350px] xl:w-[400px] mr-8 rounded-3xl p-[8px] text-custom pl-8 font-bold' />

                        {/* Add email */}
                        <input type='email' value={contactForm.email}
                            onChange={(event) => {
                                setContactForm({
                                    ...contactForm,
                                    email: event.target.value,
                                })
                            }}
                            placeholder='e-mail' className='mt-10 w-[350px] xl:w-[400px] rounded-3xl p-[8px] text-custom pl-8 font-bold' />
                    </div>


                    <div className='flex flex-row items-center'>
                        {/* Add Phone Number */}
                        <input type='text' value={contactForm.number}
                            onChange={(event) => {
                                setContactForm({
                                    ...contactForm,
                                    number: event.target.value,
                                })
                            }}
                            placeholder='phone number' className='mt-8 w-[350px] mr-8 rounded-3xl p-[8px] xl:w-[400px] text-custom pl-8 font-bold' />

                        {/* Add Gender */}
                        <div className='flex flex-row items-center justify-center mt-[24px] xl:mt-[28px] ml-2'>

                            <p className=''>Gender</p>
                            {contactForm.gender === 'male' ?
                                <div className='w-4 h-4 border-white border-2 cursor-pointer bg-red-600  rounded-full mx-2 ml-14 xl:ml-20'
                                    onClick={() => {
                                        setContactForm({
                                            ...contactForm,
                                            gender: "male",
                                        })
                                    }}
                                ></div>
                                :
                                <div className='w-4 h-4 border-white border-2 cursor-pointer  rounded-full mx-2 ml-14 xl:ml-20 '
                                    onClick={() => {
                                        setContactForm({
                                            ...contactForm,
                                            gender: "male",
                                        })
                                    }}
                                ></div>}
                            <p>male</p>


                            {contactForm.gender === 'female' ?
                                <div className='w-4 h-4 border-white border-2 cursor-pointer bg-red-600 rounded-full mx-2 ml-10 xl:ml-20'
                                    onClick={() => {
                                        setContactForm({
                                            ...contactForm,
                                            gender: "female",
                                        })
                                    }}
                                ></div>
                                :
                                <div className='w-4 h-4 border-white border-2 cursor-pointer rounded-full mx-2 ml-10 xl:ml-20'
                                    onClick={() => {
                                        setContactForm({
                                            ...contactForm,
                                            gender: "female",
                                        })
                                    }}
                                ></div>}
                            <p>female</p>

                        </div>
                    </div>


                    <button onClick={addNewContact} className='border border-b-2 rounded-2xl px-6 py-1 mt-10'>{contactButtonMsg}</button>
                    <LogOut />
                </div>
            </div>
        </>
    )
}

export default addNewContact