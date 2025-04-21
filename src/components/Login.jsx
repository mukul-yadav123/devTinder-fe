import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const [emailId,setEmailId] = useState('')
    const[error,setError] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async() =>
    {
        try {
            const response = await axios.post(`${BASE_URL}login`,{
                emailId,
                password
            },{withCredentials: true})
            dispatch(addUser(response.data.user))
            navigate('/')
        } catch (error) {
          setError(error?.response.data || "Something went wrong")
            console.log(error)
        }
    }

  return ( 
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div  >
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Email Id</legend>
        <input value={emailId} onChange={(e) =>setEmailId(e.target.value)} type="text" className="input" />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input value={password} onChange={(e) =>setPassword(e.target.value)} type="password" className="input" />
    </fieldset>
    </div>
    {error && <p className='text-red-500'>{error}</p>}
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login