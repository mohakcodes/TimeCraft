"use client"

import { useUserIdStore } from '@/utils/store';
import { useRouter,useSearchParams } from 'next/navigation';
import React from 'react'

export default function page() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const {setUserId} = useUserIdStore();

  const createEvent = async(e:any) => {
    e.preventDefault();
    setUserId(searchParams.get('id') || '');
    console.log('searchParams', searchParams.get('id'));
    router.push('/userevent');
  }

  const getAllEvents = async(e:any) => {
    e.preventDefault();
    setUserId(searchParams.get('id') || '');
    console.log('searchParams', searchParams.get('id'));
    router.push('/all_events')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-purple-600'>
      <h1 className='text-white text-4xl font-bold mb-2'>Create or Schedule the Event</h1>
      <div className='flex'>
        <button className='p-2 m-2 bg-white font-semibold rounded-lg' onClick={(e) => createEvent(e)}>Create Event</button>
        <button className='p-2 m-2 bg-white font-semibold rounded-lg' onClick={(e) => getAllEvents(e)}>All Events</button>
      </div>
    </div>
  );
  
}