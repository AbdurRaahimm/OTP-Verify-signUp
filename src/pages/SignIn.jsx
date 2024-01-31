import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigateTo = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = e.target;
        const data = {
            email: email.value,
            password: password.value
        }
        // Compare email and password and modify user isLogin true after login  in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || []; 
        const user = users.find(user => user.email === data.email && user.password === data.password);
        if(user){
            user.isLogin = true;
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = '/';
            // navigateTo('/');
        }else{
            alert('email or password is incorrect');
        }
    }
    return (
        <section className="flex justify-center items-center h-screen bg-slate-500 ">
            <div className="shadow-md bg-white px-6 py-10 space-y-3 rounded-md w-11/12 md:w-6/12">
                <h1 className="text-2xl font-bold capitalize">Sign In</h1>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit} >

                    <label className="text-sm font-semibold" htmlFor="email">Email  </label>
                    <input className="border border-gray-300 rounded-md p-2" type="email" name="email" placeholder="Enter Your Email" required />


                    <label className="text-sm font-semibold text-left" htmlFor="password">Password </label>
                    <input className="border border-gray-300 rounded-md p-2" type="password" name="password" placeholder="Enter Your Password" required />

                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2" type="submit">Send</button>
                </form>
                <p>
                    Don't have an account? <span onClick={() => navigateTo('/signup')} className="text-blue-500 cursor-pointer">Sign Up</span>
                </p>
            </div>
        </section>
    )
}
