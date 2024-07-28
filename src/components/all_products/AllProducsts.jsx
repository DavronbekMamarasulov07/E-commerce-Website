import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./AllProducts.css"
import axios from "../../api";
import { Carousel, notification, Button, Skeleton, Typography } from "antd";
import { useFetch } from "../../hooks/useFetch";
import React, { useState } from 'react'
import Container from '../../components/container/Container'
import { Link } from 'react-router-dom'




const AllProducsts = ({ }) => {
  const [trigger, setTrigger] = useState(false)
  const [{ payload }] = useFetch("/product/all", trigger)
  const [step, setStep] = useState(1)

  const { Title } = Typography
  const [data, loading] = useFetch("/auth/profile")
  let count = 4

  const handleLikeProduct = async (product) => {
    try {
      const res = await axios.patch(`/product/${product._id}/${product.likedby.includes(data.payload?.username) ? "unlike" : "like"}`);

      if (res?.data?.payload?.message === "Liked") {
        notification.success({
          message: 'Success',
          description: `You have liked this product.`,
        })
      }
      else {

        notification.warning({
          message: 'Unliked',
          description: `You have unliked this product.`,
        })
      }
      setTrigger(!trigger)

    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Error',
        description: `Failed to like product.`,
      })
    }
  };




  const contentStyle = {
    height: '100%',
    color: '#fff',
    textAlign: 'center',
    background: '#000',
  };


  return (
    <Container>
      <div className='my-[100px]  '>
        <div className='flex items-center justify-between'>
          <Title level={2}  >All Products</Title>
        </div>
        <div className='grid grid-cols-4 gap-5 mt-14'>
          {
            loading
              ?
              Array.from({ length: 4 }).map((_, index) => (
                <div className="flex flex-col gap-5 items-center" key={index}>
                  <Skeleton.Image active style={{ width: "300px", height: "300px" }} />
                  <Skeleton.Input active className="skeloton_input" style={{ width: "250px", height: "30px" }} />
                  <Skeleton.Input active className="skeloton_input" style={{ width: "200px", height: "20px" }} />
                  <Skeleton.Input active className="skeloton_input" style={{ width: "250px", height: "20px" }} />

                </div>
              ))
              :
              payload && payload.slice(0, count * step).map((product) =>

                <div className='product_card  gap-2 mb-[30px]   rounded-3xl' key={product?._id}>

                  <div className=' w-[300px]  relative h-[300px] bg-[#F0EEED] rounded-3xl overflow-hidden  '>

                    <div className="absolute t-3 l-3 w-full px-4 py-3 flex items-center justify-between z-10">
                      <div className="text-red-600 text-base  bg-white w-9 h-9   flex items-center justify-center rounded-full ">
                        {Math.round(
                          100 - (100 * product.sale_price) / product.original_price
                        )}%
                      </div>
                      <div onClick={() => handleLikeProduct(product)} className="cursor-pointer shadow-md bg-white w-9 h-9  flex items-center justify-center rounded-full ">
                        {product.likedby.includes(data.payload?.username) ? <AiFillHeart size={26} className="text-red-500" /> : <AiOutlineHeart size={26} className="text-red-500" />}
                      </div>

                    </div>

                    <Carousel arrows autoplay autoplaySpeed={3000} infinite={true} effect="fade">
                      {
                        product.product_images?.map((image, index) => (
                          <div className="rounded-3xl overflow-hidden bg-black "  key={index}>
                            <img src={image } className="scale-75 " style={contentStyle}  />
                          </div>
                        ))

                      }
                    </Carousel>


                  </div>

                  <div className='flex flex-col gap-2 mt-3 px-2'>
                    <h1 className='text-2xl font-bold'>{product?.product_name}</h1>
                    <div className='flex items-center gap-2'>
                      <strong className='text-[#000000] text-2xl'>${product?.sale_price}</strong>
                      <strong className='text-[#00000041] line-through text-xl'>${product?.original_price}</strong>

                    </div>
                    <div className="w-full h-[1px] bg-slate-300 my-2"></div>
                    <div className="flex justify-center  mb-0">
                      <Link className="text-sky-500 text-lg font-medium" to={`/product-details/${product?._id}`}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
          }
        </div>
        <div className='flex justify-center '>
          {
            payload && payload.length > count * step
              ?
              <Button onClick={() => setStep(step + 1)} type="primary">Show More</Button>
              :
              <></>
          }
        </div>
      </div>
    </Container>



  )
}

export default AllProducsts
