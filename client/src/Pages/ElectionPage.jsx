import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router'
import { ElectionContext } from '../Context/ElectionContext'
import { MdDateRange } from "react-icons/md"
import { FaLocationDot } from "react-icons/fa6";

const ElectionPage = () => {
    
    const {Elections,VotingWindow} = useContext(ElectionContext);
    const {id} = useParams();
    console.log(Elections)

    if(!Elections){
        console.log('No such Election')
        return;
    }

    console.log(Elections);

    const handleVote = async(index)=>{

        const voteData = {
            candidate_type:Elections[id].candidate[index].candidate_type,
            candidate_id:Elections[id].candidate[index].id
        }

        try{
        const token = localStorage.getItem('access-token');
        console.log(token)

        if(!token){
            console.log("Token not found");
            return;
        }
       
        const response = await fetch('http://127.0.0.1:8000/vote/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            },
      

            body:JSON.stringify(voteData)
        })

        const data = await response.json();
        console.log("data:")
        console.log(data)

        if(response.ok){
            alert(data.message)
        }else{
            alert(data.error)
        }
        
     
      
        }catch(err){
            console.log("error:")
            console.log(err);
        }
    }
    
  return (
    Elections[id] &&
    <div className='bg-[#f7f8fa]'>
        <Header />
        <div className='padding '>
            <div className='flex flex-col gap-3 card items-start'>
                <h1 className='text-2xl font-bold'>
                    <span>{Elections[id].title}</span>
                </h1>
                <div className='text-sm flex gap-2 items-center'>
                    <MdDateRange className='text-2xl text-[#2563eb]' />
                    <span>{VotingWindow.start_datetime} - {VotingWindow.end_datetime}</span>
                </div>

                <p>{Elections[id].description}</p>
                <a href="#candidates" className='button text-lg font-semibold mt-[1rem]'>Cast Your Vote</a>
            </div>
            
            <h1 id="candidates" className='title text-center'>Candidates</h1>
            
            <div className='grid justify-center grid-flow-row md:grid-cols-2 2xl:grid-cols-3 gap-4'>
                {
                    Elections[id].candidate?.map((candidate,index)=>(
                        <div className='justify-center grid grid-flow-row lg:grid-flow-col gap-2 md:gap-4 lg:gap-6 card' key={index}>
                    <div className='m-auto w-[10rem] h-full bg-gray-300 overflow-hidden'>
                        <img className='object-cover' src={`http://127.0.0.1:8000/${candidate.image}`} alt="candidate-image" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-lg font-bold'>{candidate.full_name}</h1>
                        <p className='flex gap-8 text-sm'><span>{candidate.party_associated}</span><span className='flex items-center gap-1'><FaLocationDot className='text-lg text-[#2563eb]'/>{candidate.area}</span></p>
                        <p>
                        {candidate.election_promise}
                        </p>
                        <span className='mr-6'>Votes:{candidate.votes_received}</span>
                        <button className='button' onClick={()=>handleVote(index)}>Vote this candidate</button>
                        
                       
                    </div>
                    
                </div>
                    ))
                }
                
            </div>

        </div>
       
    </div>
  )
}

export default ElectionPage