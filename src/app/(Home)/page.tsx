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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background antialiased">
      <Navbar />
      <main className="flex flex-col gap-6 sm:gap-10 md:gap-14">
        <Hero />
        <WorkSection />
        <HelloSection />
        <ProcessSection />
        <TestimonialSection />
        <AboutSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default page