import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate('')
  const userData = useSelector(store => store.user)

  const fetchUser = async() => {
    try {
    const response = await axios.get(`${BASE_URL}profile/view`,{withCredentials:true})
    if(response)
      dispatch(addUser(response.data))
    } catch (error) {
      if(error.status === 401)
      navigate('/login')
      console.log(error)
    }
  }

  useEffect(() => {
    if(!userData)
    fetchUser()
  },[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body