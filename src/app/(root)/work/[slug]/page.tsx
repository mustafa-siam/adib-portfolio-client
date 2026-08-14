import FooterSection from '@/app/Components/Home/Footer'
import CaseStudyDetailsPage from '@/app/Components/Pages/workDetailsPage/WorkDetails'
import Navbar from '@/app/Components/Shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar></Navbar>
        <CaseStudyDetailsPage></CaseStudyDetailsPage>
        <FooterSection></FooterSection>
    </div>
  )
}

export default page