"use client"

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function page() { 

  const router = useRouter();

  const caller = async () => {
    try {
      const res = await axios.get('api/google');
      router.push(res.data.url);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-purple-600'>
      <div className="text-center text-4xl text-white font-bold">
        Schedule your meetings with TIMECRAFT
      </div>
      <button className='bg-slate-100 rounded-md p-2 mt-3 font-semibold font-xl' onClick={caller}>
        <p className='text-2xl'>Login With <span className='text-blue-600'>Google</span></p>
      </button>
    </div>
  );
  
}
