import React from 'react'
import HeroImage from '../assets/hero.png'
import { Link } from 'react-router'

const Hero = () => {
  return (
    <section className='h-[80vh] md:h-[50vh] w-full bg-[#266ef3] relative mb-[3rem]'>
        <div className='-z-0 absolute left-0 bottom-0 h-[12rem] '>
          <img src={HeroImage} className='' alt="Voting" />
        </div>

        <div className='flex flex-col items-center justify-center h-full gap-6 text-white'>
          <h1 className='bg-[#266ef3] z-10 text-5xl font-bold px-[1rem] py-[0.5rem] rounded-lg'>Your Vote Matters</h1>
          <p className='z-10 bg-[#266ef3] px-[1rem] py-[0.5rem] rounded-lg '>Participate in local elections and shape the future of your community.</p>
          <Link to="/register" className='z-10 button border-white border-2 '>Register Now</Link>
        </div>
        
         
       
      </section>
  )
}

export default Hero