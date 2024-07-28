import React from 'react'
import Container from '../container/Container'

import brandCL from "../../images/brandCL.png"
import brandP from "../../images/brandP.png"
import brandV from "../../images/brandV.png"
import brandZ from "../../images/brandZ.png"
import brandG from "../../images/brandG.png"



const Brands = () => {
  return (
    <div className='w-full bg-[#000]'>
        <Container>
            <div className='flex items-center justify-between py-10'>
                <img src={brandV} alt="brandV" />
                <img src={brandZ} alt="brandZ" />
                <img src={brandG} alt="brandG" />
                <img src={brandP} alt="brandP" />
                <img src={brandCL} alt="brandCL" />
            </div>
        </Container>
    </div>
  )
}

export default Brands
