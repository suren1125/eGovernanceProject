import React, { useContext } from 'react'
import { Link } from 'react-router'
import { MdDateRange } from "react-icons/md"
import { ElectionContext } from '../Context/ElectionContext'

const Election = ({election,index}) => {
  const {VotingWindow} = useContext(ElectionContext);

  return (
    <Link to={`/election/${index}`}>
    <div className='px-[2rem] py-[2rem] shadow-md rounded-lg mb-[2rem] bg-white flex flex-col gap-2  '>
        <h1 className='text-lg font-bold'>{election.title}</h1>
        <p className='text-sm flex gap-2 items-center'>
          <MdDateRange className='text-lg text-[#2563eb]' /><span>{VotingWindow.start_datetime} - {VotingWindow.end_datetime}</span>
        </p>
        <p>{election.description}</p>
        <p className='font-bold font-lg'>Candidates:</p>
        <div className='flex gap-4'>
        
            {
            election.candidate && election.candidate.map?.((candidate,index)=>(
                <div className='bg-[#dbeafe] text-sm rounded-lg px-[0.5rem] py-[0.3rem] flex gap-2 items-center' key={index}>
                       <div className='w-[2rem] h-[2rem] rounded-full overflow-hidden'>
                        <img className='object-cover' src={`http://127.0.0.1:8000/${candidate.image}`} alt="candidate-image" />
                        </div>            
                      <p>{candidate.full_name}</p>
                      
                </div>
                  ))
                }
        </div>
    </div>
    </Link>
  )
}

export default Election