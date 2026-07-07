import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import Hero from '../Components/Home/Hero'
import WorkSection from '../Components/Home/WorkSection'

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <WorkSection></WorkSection>
    </div>
  )
}

export default page