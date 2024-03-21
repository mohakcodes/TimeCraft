"use client"

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function page() { 

  const router = useRouter();

  const caller = async () => {
    try {
      const res = await axios.get('api/google');
      console.log("res",res.data);
      router.push(res.data.url);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center my-auto mt-5'>
      <div>
        Welcome, Schedule your meetings with TIMECRAFT 
      </div>
      <button className='bg-slate-100 rounded-md p-2' onClick={caller}>Login With <span className='text-green-500'>Google</span></button>
    </div>
  );
}
