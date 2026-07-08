import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import Hero from '../Components/Home/Hero'
import WorkSection from '../Components/Home/WorkSection'
import HelloSection from '../Components/Home/HelloSection'
import ProcessSection from '../Components/Home/ProcessSection'
import TestimonialSection from '../Components/Home/Testimonial'

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <WorkSection></WorkSection>
      <HelloSection></HelloSection>
      <ProcessSection></ProcessSection>
      <TestimonialSection></TestimonialSection>
    </div>
  )
}

export default page