import React from 'react'
import Layout from '../components/Layout';

export default function Dashboard() {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(user => user.isLogin); 
  return (
    <Layout>
        <h1 className='capitalize text-2xl'> welcome Dashboard {user.name} </h1>
    </Layout>
  )
}
