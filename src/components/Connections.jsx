import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import React, { useEffect, useState } from 'react'

const Connections = () => {

    const[connections,setConnections] = useState()
    const fetchConnections = async() => {
        try {
            const res = await axios.get(`${BASE_URL}user/connections`,{withCredentials:true})
            setConnections(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchConnections()
    },[])

    if(!connections)
        return '...Loading'
    if(connections.length === 0)
        return <h1>No connections found</h1>
  return (
    <div className='text-center my-12'>
        <h1 className='font-extrabold text-3xl text-white'>Connections</h1>
        {
            connections.map(connection => (
                <div className='flex m-4 mx-auto p-4 rounded-lg bg-base-300 w-1/2'>
                   <div>
                   <img alt='photo' className='w-20 h-20 rounded-full' src={connection.photoUrl}/>
                   </div>
                   <div className='text-left mx-4'>
                   <h2 className='font-bold text-xl'>{connection.firstName + " " + connection.lastName}</h2>
                   <p>{connection.about}</p>
                  {connection.age && connection.gender && <p>{connection.age + "," + connection.gender}</p>}
                   </div>
                </div>
            ))
        }
    </div>
  )
}

export default Connections