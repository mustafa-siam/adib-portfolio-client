import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import Hero from '../Components/Home/Hero'
import WorkSection from '../Components/Home/WorkSection'
import HelloSection from '../Components/Home/HelloSection'
import ProcessSection from '../Components/Home/ProcessSection'
import TestimonialSection from '../Components/Home/Testimonial'
import AboutSection from '../Components/Home/AboutSection'
import FAQSection from '../Components/Home/Faq'
import FooterSection from '../Components/Home/Footer'

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <WorkSection></WorkSection>
      <HelloSection></HelloSection>
      <ProcessSection></ProcessSection>
      <TestimonialSection></TestimonialSection>
      <AboutSection></AboutSection>
      <FAQSection></FAQSection>
      <FooterSection></FooterSection>
    </div>
  )
}

export default page