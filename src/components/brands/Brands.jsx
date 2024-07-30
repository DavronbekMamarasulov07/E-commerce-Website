import React from 'react';
import Container from '../container/Container';

import brandCL from "../../images/brandCL.png";
import brandP from "../../images/brandP.png";
import brandV from "../../images/brandV.png";
import brandZ from "../../images/brandZ.png";
import brandG from "../../images/brandG.png";
import './Brands.css';

const Brands = () => {
  return (
    <div className='w-full bg-[#000] overflow-hidden'>
      <div className='brands-scroll-container'>
          <div className='brands-scroll-content'>
            <img  src={brandV} alt="brandV" />
            <img  src={brandZ} alt="brandZ" />
            <img  src={brandG} alt="brandG" />
            <img  src={brandP} alt="brandP" />
            <img  src={brandCL} alt="brandCL" />
          </div>
        </div>
    </div>
  );
};

export default Brands;
