'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import userService from '@/services/userService'
import { GlobalContext } from '@/context'


const Login = () => {
    const router = useRouter();
    const { login } = userService();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const { setToken } = useContext(GlobalContext);


    // User Login Function
    const UserLogin = async () => {
        if (loginForm.email.trim() === "" || loginForm.password.trim() === "") {
            alert("Please Fill All Fields")
        } else {
            const userLoginData = await login(loginForm);
            if (userLoginData.data.message === "Login Success") {
                alert(userLoginData.data.message);
                router.push('pages/Welcome');
                localStorage.setItem('token', JSON.stringify(userLoginData.data.token));
                setToken(userLoginData.data.token);
            } else {
                alert(userLoginData.data.message);
            }
        }
    }


    return (
        <>
            <div className='w-full flex flex-row'>
                <div className='w-7/12'>

                    {/* Background Images */}
                    <div className='h-screen absolute inset-0 z-10'>
                        <Image src='/assets/Ellipse.png' alt='Ellipse' priority={true} width={1000} height={1000} className='h-full xl:w-[850px] w-auto object-cover pr-0' />
                    </div>
                    <div className=' h-screen absolute inset-0 ml-[600px]'>
                        <Image src='/assets/bg.png' alt='bg' width={1000} height={1000} className='h-full object-cover pr-0' />
                    </div>

                    {/* Header and Login Form */}
                    <div className='w-7/12 h-screen relative text-white z-20'>
                        <div className='absolute inset-0 flex flex-col xl:ml-40 ml-20'>
                            <p className='text-white font-bold text-[46px] ml-0 xl:mt-32 mt-20'>Hi there,</p>
                            <p className='text-[28px] font-sans mt-2 ml-0 font-normal'>
                                Welcome to our<br />
                                contacts portal
                            </p>

                            <input type='email' onChange={(event) => (
                                setLoginForm({
                                    ...loginForm,
                                    email: event.target.value
                                })
                            )} placeholder='e-mail' className='mt-14 w-full rounded-3xl p-[8px] text-custom pl-8 font-bold' />


                            <input type='password' onChange={(event) => (
                                setLoginForm({
                                    ...loginForm,
                                    password: event.target.value
                                })
                            )} placeholder='password' className='mt-8 w-full rounded-3xl p-[8px] text-custom pl-8 font-bold' />


                            <div className='flex flex-row mt-10 xl:mt-20 items-center'>
                                <button onClick={UserLogin} className='border-2 p-[4px] px-[30px] rounded-3xl'>login</button>
                                <p className='mx-4'>or</p>
                                <p onClick={() => { router.push('/register') }} className='underline cursor-pointer'>Click here to Register</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='w-5/12 z-10'>
                    <div className='ml-10 xl:mt-[250px] mt-[220px]'>
                        <Image src='/assets/logo2.png' alt='logo' className='w-[140px] h-auto' width={150} height={60} />
                        <p className='font-bold text-6xl text-custom mt-2'>contacts</p>
                        <p className='text-5xl text-custom font-semibold'>portal</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login