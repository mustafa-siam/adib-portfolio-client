import FooterSection from '@/app/Components/Home/Footer'
import AllWorks from '@/app/Components/Pages/WorkPage/AllWorks'
import Navbar from '@/app/Components/Shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
        <AllWorks></AllWorks>
        <FooterSection></FooterSection>
    </div>
  )
}

export default page