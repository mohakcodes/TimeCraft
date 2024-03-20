"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const getTokens = async () => {
    const oauth2Client = JSON.parse(localStorage.getItem('oauth2Client') || '') || {};
    try {
      const res = await axios.post('/api/set_token', {code, oauth2Client});
      console.log("Result",res.data);
    } 
    catch (error) {
      console.log(error);  
    }
  }

  useEffect(() => {
    getTokens();
  },[])

  return (
    <div>
      loading... {code}    
    </div>
  )
}