"use client"
import { generateRandomId } from '@/utils/getrandomid';
import { useUserIdStore } from '@/utils/store';
import axios from 'axios';
import React, {useState} from 'react'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRouter } from 'next/navigation';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function page() {

  const router = useRouter();

  const {userId} = useUserIdStore();

  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  const [startTime, setStartTime] = useState('');

  const createEvent = async() => {
    const randomId = generateRandomId();

    //convert UTC start time to current timezone
    const timeZoneOfUser = Intl.DateTimeFormat().resolvedOptions().timeZone;
    dayjs.tz.setDefault(timeZoneOfUser);
    const localeStartTime = dayjs(startTime).tz(timeZoneOfUser).format();

    try {
        const res = await axios.post('/api/create_event', {
            summary: eventName,
            description: eventDesc,
            timeZone: "Asia/Kolkata",
            eventLink: `http://localhost:3000/schedule_event/${randomId}`,
            startDateTime: localeStartTime,
            flag: true,
            userId: userId,
        });
        console.log('event post result', res);
        router.push('/all_events');

    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-purple-600'>
      <h1 className='text-2xl mb-3 text-white font-bold'>Fill Event Details Below</h1>
      <div className='bg-gray-200 p-6 rounded-lg shadow-lg'>
        <div className='space-y-3'>
          <div>
            <p className='text-lg text-gray-800'>
              Location: Google Meet
            </p>
            <p className='text-lg text-gray-800'>
              Duration: 30 minutes
            </p>
          </div>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold text-gray-900'>Event Name</h2>
            <input type="text" className='input-field' onChange={(e)=>{setEventName(e.target.value)}}/>
          </div>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold text-gray-900'>Event Description</h2>
            <input type="text" className='input-field' onChange={(e)=>{setEventDesc(e.target.value)}}/>
          </div>
          <div className='space-y-1'>
            <label htmlFor="startTime" className='text-lg font-semibold text-gray-900'>Start Time:</label>
            <br />
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e)=>{setStartTime(e.target.value)}}
              className='input-field'
              required
            />
          </div>
        </div>
      </div>
      <button className='px-6 py-2 mt-4 rounded-md bg-slate-200 text-xl font-semibold shadow-md hover:bg-slate-300 transition duration-300' onClick={createEvent}>Create</button>
      <a href="/homepage" className='px-4 py-1 mt-2 text-black rounded-md bg-purple-100'>Back</a>
    </div>
  );
  
}