import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {BASE_URL} from '../utils/constants'
import UserCard from './UserCard'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

const EditProfile = ({user}) => {

    const dispatch = useDispatch()
    const [firstName,setFirstName] = useState(user.firstName)
    const [lastName,setLastName] = useState(user.lastName)
    const [age,setAge] = useState(user.age)
    const [gender,setGender] = useState(user.gender)
    const [about,setAbout] = useState(user.about)
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl)
    const[error,setError] = useState('')

    const saveProfile = async() => {
        setError('')
        try {
            const res = await axios.patch(`${BASE_URL}profile/edit`,{
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            },{withCredentials:true})
            dispatch(addUser(res.data))
            
        } catch (error) {
            setError(error?.response?.message)
        }
    }

  return (
    <div className='flex justify-center my-10'>
    <div className='flex justify-center mx-10'>
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div  >
    <fieldset className="fieldset">
        <legend className="fieldset-legend">First Name</legend>
        <input value={firstName} onChange={(e) =>setFirstName(e.target.value)} type="text" className="input" />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Last Name</legend>
        <input value={lastName} onChange={(e) =>setLastName(e.target.value)} type="text" className="input" />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Age</legend>
        <input value={age} onChange={(e) =>setAge(e.target.value)} type="text" className="input" />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Gender</legend>
        <input value={gender} onChange={(e) =>setGender(e.target.value)} type="text" className="input" />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">About</legend>
        <input value={about} onChange={(e) =>setAbout(e.target.value)} type="text" className="input" />
    </fieldset>
    <fieldset className="fieldset">
        <legend className="fieldset-legend">Profile Pic</legend>
        <input value={photoUrl} onChange={(e) =>setPhotoUrl(e.target.value)} type="text" className="input" />
    </fieldset>
    </div>
    {error && <p className='text-red-500'>{error}</p>}
    <div className="card-actions justify-center">
      <button onClick={saveProfile} className="btn btn-primary">Update</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={user}/>
    </div>
  )
}

export default EditProfile