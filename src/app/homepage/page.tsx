"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {

  const handleClick = async(e:any) => {
    e.preventDefault();
    try {
      console.log('clicked');
      const res = await axios.get('http://localhost:8000/schedule_event');
      console.log('res', res);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const router = useRouter();

  return (
    <div className='flex flex-col items-center'>
        <h1 className='flex items-center text-black text-2xl'>Welcome to the homepage</h1>
        <button className='p-2 m-2 bg-slate-300 rounded-lg' onClick={(e)=>handleClick(e)}>Schedule Event</button>
        <button className='p-2 m-2 bg-slate-300 rounded-lg' onClick={()=>router.push('/userevent')}>Create Event</button>
        <button className='p-2 m-2 bg-slate-300 rounded-lg' onClick={()=>router.push('/all_events')}>All Events</button>
    </div>
  )
}