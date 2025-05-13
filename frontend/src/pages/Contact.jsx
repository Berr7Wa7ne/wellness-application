import React from 'react'
import { ContactHero } from '../components/contact/ContactHero'
import Navbar from '../components/layout/Navbar'
import { ContactForm } from '../components/contact/ContactForm'
import { Newsletter } from '../components/shared/Newsletter'
import { Footer } from '../components/layout/Footer'

const Contact = () => {
  return (
    <div>
        <ContactHero>
            <Navbar />
            </ContactHero>
            <ContactForm />
            <Newsletter />
            <Footer />

    </div>
  )
}

export default Contact