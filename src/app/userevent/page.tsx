"use client"
import { generateRandomId } from '@/utils/getrandomid';
import { useUserIdStore } from '@/utils/store';
import axios from 'axios';
import React, {useState} from 'react'

export default function page() {

  const {userId} = useUserIdStore();
  console.log('userId->', userId);

  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const createEvent = async() => {
    const randomId = generateRandomId();

    const divideDate = selectedDate.split('/');
    const correctDate = divideDate.reverse().join('-');
    const startHr = selectedTime.split(':')[0];

    const end_Hr = parseInt(startHr) + 1;
    const endHr = end_Hr < 10 ? '0'+end_Hr : end_Hr;

    const startTime = `${correctDate}T${startHr}:00:00.000`;
    const endTime = `${correctDate}T${endHr}:00:00.000`;
    try {
        const user = await axios.get(`/api/get_user/${userId}`);
        const res = await axios.post('/api/create_event', {
            summary: eventName,
            description: eventDesc,
            timeZone: "Asia/Kolkata",
            eventLink: `http://localhost:3000/schedule_event/${randomId}`,
            startDateTime: startTime,
            endDateTime: endTime,
            owner: user.data.user.email,
            flag: true,
        });
        console.log('event post result', res);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-GB');
      dates.push(formattedDate);
    }
    return dates;
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
        const time = `${i < 10 ? '0'+i : i}:00 - ${i+1 < 10 ? '0'+(i+1) : i+1}:00`;
        times.push(time);
    }
    return times;
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
                <div>
                    <h2>Select Date</h2>
                </div>
                <div>
                    <select onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value=''>Select Date</option>
                    {generateDateOptions().map((date, index) => (
                        <option key={index} value={date}>
                        {date}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div>
                    Select Time Slot
                </div>
                <div>
                    <select onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value=''>Select Time</option>
                    {generateTimeOptions().map((time, index) => (
                        <option key={index} value={time}>
                        {time}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
        </div>
        <button className='p-2 m-2 bg-slate-200' onClick={createEvent}>Create</button>
    </div>
  )
}