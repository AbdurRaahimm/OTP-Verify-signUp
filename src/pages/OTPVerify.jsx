import React, { useState } from 'react'
import { useOTP } from '../store/OTPProvider'
import { useNavigate } from 'react-router-dom';

export default function OTPVerify() {
    const otp = useOTP();
    const navigateTo = useNavigate();
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
            // alert('OTP Verified')
            navigateTo('/signin')
        } else {
            alert('OTP Not Matched')
        }
    }
    return (
        <section className="flex justify-center items-center h-screen bg-slate-500">
            <div className="shadow-md bg-white p-4 py-10 space-y-3 rounded-md w-3/12">
                <h1 className="text-2xl font-bold capitalize text-center">OTP Verify</h1>
                <p className='capitalize text-center'>check your email for OTP</p>
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
