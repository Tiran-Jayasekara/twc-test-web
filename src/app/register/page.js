'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import userService from '@/services/userService'

const Register = () => {
    const router = useRouter();
    const { register } = userService();
    const [registerForm, setRegisterForm] = useState({
        email: "",
        password: "",
        rePassword: ""
    });

    // User Register
    const RegisterUser = async () => {
        if (registerForm.email.trim() === "" || registerForm.password.trim() === "" || registerForm.rePassword.trim() === "") {
            alert("Please Fill All Fields")

        } else if (registerForm.password != registerForm.rePassword) {
            alert("Password Doesn't Match")

        } else {
            const { rePassword, ...formData } = registerForm;
            const registerData = await register(formData);
            if (registerData.data.message == "User Add Successfull") {
                alert(registerData.data.message)
                router.push('/login')
            } else {
                alert(registerData.data.message)
            }
        }
    }


    return (
        <>
            <div className='w-full flex flex-row'>

                {/* Background Image */}
                <div className='w-7/12'>
                    <div className='h-screen absolute inset-0 z-10'>
                        <Image src='/assets/Ellipse.png' priority={true} width={1000} height={1000} className='h-full xl:w-[850px] w-auto object-cover pr-0' alt='ellipse' />
                    </div>
                    <div className=' h-screen absolute inset-0 ml-[600px]'>
                        <Image src='/assets/bg.png' width={1000} height={1000} className='h-full object-cover pr-0' alt='background' />
                    </div>

                    {/* Register Form */}
                    <div className='w-7/12 h-screen relative text-white z-20'>
                        <div className='absolute inset-0 flex flex-col xl:ml-40 ml-20'>
                            <p className='text-white font-bold text-[42px] ml-0 xl:mt-32 mt-20'>Register Now!</p>

                            <input type='email' onChange={(event) => (
                                setRegisterForm({
                                    ...registerForm,
                                    email: event.target.value
                                })

                            )} placeholder='e-mail' className='mt-10 w-full rounded-3xl p-[8px] text-custom pl-8 font-bold' />

                            <input type='password' onChange={(event) => (
                                setRegisterForm({
                                    ...registerForm,
                                    password: event.target.value
                                })
                            )} placeholder='create password' className='mt-8 w-full rounded-3xl p-[8px] text-custom pl-8 font-bold' />


                            <input type='password'
                                onChange={(event) => (
                                    setRegisterForm({
                                        ...registerForm,
                                        rePassword: event.target.value
                                    })
                                )}
                                placeholder='confirm password' className='mt-8 w-full rounded-3xl p-[8px] text-custom pl-8 font-bold' />


                            <button onClick={RegisterUser} className='border-2 p-[4px] px-[30px] rounded-3xl w-[150px] mt-20'>register</button>
                            <p className='mt-20 underline ml-2 cursor-pointer' onClick={() => { router.push('/login') }}>&lt; Back to login</p>
                        </div>
                    </div>
                </div>


                <div className='w-5/12 z-10'>
                    <div className='ml-10 xl:mt-[250px] mt-[200px]'>
                        <Image src='/assets/logo2.png' className='w-[140px] h-auto' width={150} height={60} alt='logo' />
                        <p className='font-bold text-6xl text-custom mt-2'>contacts</p>
                        <p className='text-5xl text-custom font-semibold'>portal</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register