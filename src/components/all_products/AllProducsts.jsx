import { AiTwotoneDislike } from "react-icons/ai"; 
import { AiFillLike } from "react-icons/ai"; 
import { FaHeartBroken } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState } from 'react'
import "./AllProducts.css"
import { Link } from "react-router-dom";
import axios from "../../api";
import { notification } from "antd";

const AllProducsts = ({ allData }) => {
  const handleLikedProduct  =  async(likedProduct) => {
      try {
        const res = await axios.patch(`/product/${likedProduct._id}/like`)
        notification.success({
          message: 'Product Liked 👍',
          description: 'Product has been liked.',
        })
      } catch (error) {
        console.log(error)
        notification.error({
          message: 'Error',
          description: 'Failed to like product.',
        })
      }
  }
  const handleUnlikedProduct = async (unlikedProduct) => {
    try {
      const res = await axios.patch(`/product/${unlikedProduct._id}/unlike`)
      notification.warning({
        message: 'Product Unliked 💔',
        description: 'Product has been unliked.',
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: 'Failed to unlike product.',
      })
    }
  }

  return (
    <div className='product_card  gap-2 mb-[30px]  px-6 py-6 rounded-3xl'>

      <div className='cart_img_content relative flex items-center justify-center w-[300px]  h-[300px] bg-[#F0EEED] rounded-3xl overflow-hidden p-12 '>
        <div className='cart_hover  px-8  w-full h-full max-w-[300px]  gap-4 flex  justify-between'>
          <span onClick={ () => handleUnlikedProduct(allData)} className="unlike_icon cart_icons">
            <AiTwotoneDislike />
          </span>
          <span onClick={ () => handleLikedProduct(allData)} className="like_icon cart_icons">
            <AiFillLike />
          </span>
        </div>
        <img src={allData?.product_images[0]} className='w-full  h-full object-cover mix-blend-multiply ' />
      </div>
      <div className='flex flex-col gap-2 mt-3 px-2'>
        <h1 className='text-2xl font-bold'>{allData?.product_name}</h1>
        <div className='flex items-center gap-2'>
          <strong className='text-[#000000] text-2xl'>${allData?.sale_price}</strong>
          <strong className='text-[#00000041] line-through text-2xl'>${allData?.original_price}</strong>
        </div>
      </div>
    </div>
  )
}

export default AllProducsts
