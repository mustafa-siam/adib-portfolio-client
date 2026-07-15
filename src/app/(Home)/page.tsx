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
import RecentWork from '../Components/Home/RecentWorks'

const page = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background antialiased">
      <Navbar />
      <main className="space-y-10 md:space-y-20">
        <Hero />
        <WorkSection />
        <HelloSection />
        <ProcessSection />
        <TestimonialSection />
        <RecentWork></RecentWork>
        <AboutSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default page