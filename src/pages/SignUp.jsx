import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOTP } from '../store/OTPProvider';
import { generateCapture } from '../utilis/generateCapture';

export default function SignUp() {
  const navigateTo = useNavigate();
  const otp = useOTP();
  // console.log(otp);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const chapture = e.target.chapture.value;
    const confirmChapture = e.target.confirmChapture.value;
    if (password !== confirmPassword) {
      alert("Password and Confirm Password does not match");
      return;
    }

    if (chapture !== confirmChapture) {
      alert("Chapture and Confirm Chapture does not match");
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.email === email);
    if (user) {
      alert('email already exist');
      return;
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      isLogin: false,
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    Email.send({
      SecureToken: import.meta.env.VITE_OTP_PASS,
      To: email,
      From: import.meta.env.VITE_FROM_EMAIL,
      Subject: "Account Verification",
      Body: "This is your OTP : " + otp,
    }).then(
      message => alert(message)
    );
    navigateTo('/verify');
  }
  return (
    <section className="flex justify-center items-center h-screen bg-slate-500 ">
      <div className="shadow-md bg-white px-6 py-10 space-y-3 rounded-md w-11/12 md:w-6/12">
        <h1 className="text-2xl font-bold capitalize">Sign Up</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit} >
          <label className="text-sm font-semibold" htmlFor="name">Name  </label>
          <input className="border border-gray-300 rounded-md p-2" type="text" name="name" placeholder="Enter Your Name" required />
          <label className="text-sm font-semibold" htmlFor="email">Email  </label>
          <input className="border border-gray-300 rounded-md p-2" type="email" name="email" placeholder="Enter Your Email" required />

          <div className="flex md:justify-between md:items-center flex-col md:flex-row space-y-2 ">
            <label className="text-sm font-semibold text-left" htmlFor="password">Password: </label>
            <input className="border border-gray-300 rounded-md p-2" type="password" name="password" placeholder="Enter Your Password" required />

            <label className="text-sm font-semibold" htmlFor="confirmPassword">Confirm Password:</label>
            <input className="border border-gray-300 rounded-md p-2" type="password" name="confirmPassword" placeholder="Enter Your Password Again" required />
          </div>
          <label className="text-sm font-semibold capitalize" htmlFor="phone">capture verify</label>
          <div className="flex md:justify-center md:items-center flex-col md:flex-row ">
            <input className="font-elite text-xl font-bold text-center bg-transparent " disabled type="text" name="chapture" value={generateCapture(6)} />
            <input className="border border-gray-300 rounded-md p-2" type="text" name="confirmChapture" required />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2" type="submit">Send</button>
        </form>
        <p>
          Already have an account? <span onClick={() => navigateTo('/signin')} className="text-blue-500 cursor-pointer">Sign In</span>
        </p>
      </div>
    </section>
  )
}
