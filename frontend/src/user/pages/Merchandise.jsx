import React from 'react'
import { MerchandiseHero } from '../components/merchandise/MerchandiseHero'
import Navbar from '../components/layout/Navbar'
import { MerchandiseProductSection } from '../components/merchandise/MerchandiseProductSection'
import { Newsletter } from '../components/shared/Newsletter'
import { Footer } from '../components/layout/Footer'

const Merchandise = () => {
  return (
    <div>
        <MerchandiseHero>
            <Navbar />
        </MerchandiseHero>
        <MerchandiseProductSection />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default Merchandise