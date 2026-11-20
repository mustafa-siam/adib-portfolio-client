import FooterSection from '@/app/Components/Home/Footer'
import ContactPage from '@/app/Components/Pages/ContactPage/Contact'
import Navbar from '@/app/Components/Shared/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar></Navbar>
        <ContactPage></ContactPage>
        <FooterSection></FooterSection>
    </div>
  )
}

export default page