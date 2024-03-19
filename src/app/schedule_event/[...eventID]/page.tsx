"use client"
import axios from 'axios';
import { useParams} from 'next/navigation'
import React, { useEffect,useState } from 'react'

export default function page() {

  const { eventID } = useParams();
  const e_id =  eventID[0];

  const [loading,setLoading] = useState(true);
  const [eventDetails,setEventDetails]:any = useState();

useEffect(() => {
    const getEventDetails = async() => {
        const res = await axios.get(`http://localhost:8000/event_details/${e_id}`);
        console.log('event details', res);
        setLoading(false);
        setEventDetails(res.data);
    }
    getEventDetails();
},[]);

if(loading){
  return(
    <div className='text-xl text-black font-bold flex justify-center p-2'>
      <p>Loading...</p>
    </div>
  )
}

  return (
    <div className='flex flex-col items-center p-2'>
      <h1 className='font-bold text-2xl'>Event Scheduling Page</h1>
      <div className='flex flex-col items-left p-3 w-[60%] gap-2'>
          <p className="bg-gray-100 p-2 whitespace-pre-wrap">Topic - {eventDetails?.summary}</p>
          <p className="bg-gray-100 p-2 whitespace-pre-wrap">Details - {eventDetails?.description}</p>
          <p className='bg-gray-100 p-2'>Location - Google Meet</p>
          <p className='bg-gray-100 p-2'>Time - 30 Minutes</p>
      </div>
  </div>
  )
}