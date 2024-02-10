import React, { useState } from 'react'
import { useOTP } from '../store/OTPProvider'
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useDataPass } from '../store/DataPassProvider';

export default function OTPVerify() {
    const { data } = useDataPass();
    const otp = useOTP();
    const navigateTo = useNavigate();

    // console.log(data);
    const handleInput = (e) => {
        // if I type number then focus next input if i remove number then focus previous input 
        if (e.target.value.length > 0) {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus()
            }
        } else {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus()
            }
        }
        // if (e.target.value.length === 1 && e.target.nextElementSibling) {
        //     e.target.nextElementSibling.focus()
        // }
        // if (e.target.value.length === 0 && e.target.previousElementSibling) {
        //     e.target.previousElementSibling.focus()
        // }
        // if (e.target.value.length > 1) {
        //     e.target.value = e.target.value.slice(0, 1)
        // }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // take all input value and concat them and compare with otp
        let inotp = ''
        document.querySelectorAll('input').forEach(input => {
            inotp += input.value
        })
        if (inotp === otp) {
            // save data in localstorage 
            const users = JSON.parse(localStorage.getItem('users')) || [] 
            users.push(data);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Your Registration Successfully Done! ');
            navigateTo('/signin')
        } else {
            alert('OTP Not Matched');
        }
    }
    return (
        <section className="flex justify-center items-center h-screen bg-slate-500">
            <div className="shadow-md bg-white p-4 py-10 space-y-3 rounded-md w-3/12">
                <h1 className="text-2xl font-bold capitalize text-center">OTP Verify</h1>
                <p className=' text-center'>Check Your Email For OTP  <span className='font-bold text-xl'> {data.email} </span> </p>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit} >
                    <div className="flex justify-center">
                        {/* input with otp length */}
                        {
                            otp.split('').map((data, index) => {
                                return <input className="border border-gray-300 rounded-md p-2 text-center w-12 mx-1 font-bold text-xl focus:outline-blue-600" key={index} type="text" maxLength="1" onChange={handleInput} required />
                            })
                        }
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2" type="submit"  >OTP Verify</button>
                </form>
            </div>
        </section>
    )
}
