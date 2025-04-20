import React, { useContext } from 'react'
import Header from '../components/Header'
import UserProfile from '../components/UserProfile';
import Hero from '../components/Hero';
import { ElectionContext } from '../Context/ElectionContext';
import Election from '../components/Election';

const Home = () => {
  const {Elections} = useContext(ElectionContext);

  return (
    <div className='bg-[#f7f8fa] '>
      <Header />

      <Hero />
      <div className='flex flex-col md:grid grid-cols-[1fr_3.5fr] padding items-start gap-4 lg:gap-8'>
        <UserProfile />
        
        <div id="elections" >
          {
            Elections && Elections.map((election,index)=>(
            <Election key={index} election={election} index={index} />
            ))
          }
            
        </div>
      </div>
    </div>
  )
}

export default Home