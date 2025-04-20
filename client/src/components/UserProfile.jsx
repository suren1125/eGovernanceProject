import React, { useContext } from 'react'
import defaultImage from '../assets/Default.png'
import { AuthUserContext } from '../Context/AuthUserContext'
import { Link } from 'react-router'
const UserProfile = () => {
  const {user} = useContext(AuthUserContext)

  return (
    user ?
    <div className="w-full bg-white shadow-md p-4 ">
          <div className="flex flex-col gap-2 items-center">
              <div className="w-[5rem] h-[5rem] rounded-full">
                <img src={defaultImage} alt="Profile Picture" />
              </div>
              <p className="font-semibold">{user.full_name}</p>
              <p className="text-sm text-[#266ef3]">{user.email}</p>
          </div>

          <div className="mt-[1rem] border-t-1 pt-3 text-sm border-gray-600 flex flex-col items-start gap-2">
              <p><span className='font-semibold'>Voter Id: </span>{user.voter_id}</p>
              <p><span className='font-semibold'>Citizenship: </span>{user.citizenship_number}</p>
              <p><span className='font-semibold'>Voted: </span>{user.voted?<span>True</span>:<span>False</span>}</p>
              <p><span className='font-semibold'>Location: </span>{user.address}</p>
          </div>    
      </div>:
        <div className="w-full bg-white shadow-md p-4 h-[15rem] " >
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[5rem] h-[5rem] rounded-full mb-[2rem]">
              <img src={defaultImage} alt="Profile Picture" />
            </div>
            <Link to="/login" className='button'>Log in to continue</Link>
          </div>
        </div>
        
  )
}

export default UserProfile