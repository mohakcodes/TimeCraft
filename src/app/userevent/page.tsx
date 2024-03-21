"use client"
import { generateRandomId } from '@/utils/getrandomid';
import { useUserIdStore } from '@/utils/store';
import axios from 'axios';
import React, {useState} from 'react'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function page() {

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
        const user = await axios.get(`/api/get_user/${userId}`);
        const res = await axios.post('/api/create_event', {
            summary: eventName,
            description: eventDesc,
            timeZone: "Asia/Kolkata",
            eventLink: `http://localhost:3000/schedule_event/${randomId}`,
            startDateTime: localeStartTime,
            owner: user.data.user.email,
            flag: true,
            access_token: user.data.user.access_token,
        });
        console.log('event post result', res);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-2xl mt-3 font-bold'>Fill Event Details Below</h1>
        <div className='bg-gray-200 p-4 w-[50%]'>
            <div className='flex flex-col items-center'>
                <div>
                    Location: Google Meet
                </div>
                <div>
                    Duration: 30 minutes
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div>
                    <h2>Event Name</h2>
                </div>
                <div>
                    <input type="text" onChange={(e)=>{setEventName(e.target.value)}}/>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div>
                    <h2>Event Description</h2>
                </div>
                <div>
                    <input type="text" onChange={(e)=>{setEventDesc(e.target.value)}}/>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor="startTime">Start Time:</label>
                <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    value={startTime}
                    onChange={(e)=>{setStartTime(e.target.value)}}
                    required
                />
            </div>
        </div>
        <button className='p-2 m-2 bg-slate-200' onClick={createEvent}>Create</button>
    </div>
  )
}