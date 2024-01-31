import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigateTo = useNavigate();
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.isLogin);
    const logoutHandler = () => {
        user.isLogin = false;
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = '/signin'
        // navigateTo('/signin')
    }
    return (
        <header className='bg-slate-300 flex justify-between items-center px-4 text-black shadow-md' >
            <div className="text-xl font-bold">Logo</div>
            <nav>
                <ul className='flex justify-between'>
                    <li className='m-2 capitalize text-lg font-semibold hover:text-blue-500 cursor-pointer '>home</li>
                    <li className='m-2 capitalize text-lg font-semibold hover:text-blue-500 cursor-pointer'>about</li>
                    <li className='m-2 capitalize text-lg font-semibold hover:text-blue-500 cursor-pointer'>contact</li>
                </ul>
            </nav>
            <div className="space-x-2">
                {/*profile image  */}
                <span className="font-semibold uppercase bg-gray-400 text-white rounded-full p-2">{user.name.slice(0, 2)}</span>
                <span className="text-gray-500 font-semibold capitalize">{user.name}</span>
                <button onClick={logoutHandler} className='capitalize border border-blue-500 px-4 py-1 rounded-xl'> log out </button>
            </div>
        </header>
    )
}
