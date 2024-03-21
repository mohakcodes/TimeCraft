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
            endDateTime: event.endDateTime,
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
    <div className='text-center'>
        <h1 className='text-2xl font-bold mt-2'>All Events</h1>
        <div>
            {events.map((event:any, index:number) => {
                return(
                    <div key={index} className='bg-gray-200 p-4 m-2'>
                        <p className='text-xl font-bold'>{event.summary}</p>
                        <p className='text-lg'>{event.description}</p>
                        <p className='text-lg'>Date - {formatDate(event.startDateTime)}</p>
                        <p className='text-lg'>From - {formatTime(event.startDateTime)} to {formatTime(event.endDateTime)}</p>
                        <p className='text-lg'>Organizer - {event.owner}</p>
                        <button 
                            className='bg-blue-100 p-1 rounded-lg border-2 border-black'
                            onClick={(e)=>BookEvent(e,event)}
                        >
                            Book
                        </button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}