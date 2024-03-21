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
    <div className='flex flex-col items-center'>
        <h1 className='flex items-center text-black text-2xl'>Welcome to the homepage</h1>
        <button className='p-2 m-2 bg-slate-300 rounded-lg' onClick={(e)=>createEvent(e)}>Create Event</button>
        <button className='p-2 m-2 bg-slate-300 rounded-lg' onClick={(e)=>getAllEvents(e)}>All Events</button>
    </div>
  )
}