import React from 'react'
import Layout from '../components/Layout';
import Rating from '../components/Rating';

export default function Dashboard() {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(user => user.isLogin); 
  return (
    <Layout>
        <h1 className='capitalize text-2xl'> welcome Dashboard <span className='font-bold' >{user.name}</span> </h1>

        <Rating />
    </Layout>
  )
}
