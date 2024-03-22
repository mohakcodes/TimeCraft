"use client"
import { useUserIdStore } from '@/utils/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function page() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const {userId} = useUserIdStore();

  const getEvents = async() => {
    try {
        const res = await axios.get('/api/all_events');
        setEvents(res.data);
        setLoading(false);
    } 
    catch (error) {
        console.error('Error getting events:', error);    
    }
  }

  useEffect(() => {
    getEvents();   
  },[])

  if(loading){
    return(
        <div className='flex flex-col items-center'>
            <p className='text-xl text-black font-bold'>Loading...</p>
        </div>
    )
  }

  const formatDate = (dateString: string) => {
    const parts = dateString.substring(0, 10).split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatTime = (timeString: string) => {
    if (typeof timeString === 'string' && timeString.length >= 16) {
        const parts = timeString.substring(11, 16).split(':');
        return `${parts[0]}:${parts[1]}`;
    }
    return;
  }

  const BookEvent = async(e:any,event:any) => {
    e.preventDefault();
    try {
        const res = await axios.post('/api/schedule_event', {
            summary: event.summary,
            description: event.description,
            timeZone: event.timeZone,
            startDateTime: event.startDateTime,
            owner: event.owner,
            eventId: event._id,
            userId: userId,
        });
        console.log('event post result', res);
    } 
    catch (error) {
        console.error('Error booking event:', error);    
    }
  }

  return (
    <div className='text-center min-h-screen bg-purple-600 pb-4'>
        <div className='flex justify-around'>
          <h1 className='text-2xl font-bold text-white p-4'>All Events</h1>
          <a href="/homepage" className='my-auto px-4 py-1 text-black bg-purple-100'>Back</a>
        </div>
        <div className='flex flex-col'>
            {events.map((event:any, index:number) => {
                return(
                    <div 
                      className=" bg-white border-2 border-white mt-2 mx-auto px-8 sm:py-0 w-[70%] sm:w-[65%] md:w-[50%] lg:w-[50%] rounded-lg shadow-lg p-4" 
                      key={index}
                    >
                      <dl className="-my-3 divide-y divide-gray-100 text-sm sm:py-3 py-1">
                        <div className="flex sm:flex-row flex-col">
                          <dt className="text-left w-[30%] font-medium text-gray-900">Event Title</dt>
                          <dd className="w-[70%] text-left text-gray-700">{event.summary}</dd>
                        </div>

                        <div className="flex sm:flex-row flex-col">
                          <dt className="text-left w-[30%] font-medium text-gray-900">Description</dt>
                          <dd className="w-[70%] text-left text-gray-700">
                            {event.description}
                          </dd>
                        </div>

                        <div className="flex sm:flex-row flex-col">
                          <dt className="text-left w-[30%] font-medium text-gray-900">Organizer</dt>
                          <dd className="w-[70%] text-left text-gray-700">{event.owner}</dd>
                        </div>

                        <div className="flex sm:flex-row flex-col">
                          <dt className="text-left w-[30%] font-medium text-gray-900">Start From</dt>
                          <dd className="w-[70%] text-left text-gray-700">{formatDate(event.startDateTime)}, {formatTime(event.startDateTime)}</dd>
                        </div>

                        <div className="flex sm:flex-row flex-col">
                          <dt className="text-left w-[30%] font-medium text-gray-900">Duration</dt>
                          <dd className="w-[70%] text-left text-gray-700">1 Hour</dd>
                        </div>

                        <button 
                          className='bg-blue-200 py-1 px-4 m-2 rounded-lg border-2 flex text-left border-black'
                          onClick={(e)=>BookEvent(e,event)}
                        >
                          Book
                        </button>

                      </dl>
                    </div>
                )
            })}
        </div>
    </div>
  )
}