import { Carousel } from 'antd'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CategoryList = ({ item, loading, trigger, setTrigger, data, handleLikeProduct }) => {

    

    const contentStyle = {
        height: "100%",
        color: "#fff",
        textAlign: "center",
        background: "#000",
    };
    return (
        <div
            className="product_card mb-[30px] gap-2 rounded-3xl"
            key={item?._id}
        >
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-3xl bg-[#F0EEED]">
                <div className="t-3 l-3 absolute z-10 flex w-full items-center justify-between px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base text-red-600">
                        {Math.round(
                            100 -
                            (100 * item?.sale_price) / item?.original_price,
                        )}
                        %
                    </div>
                    <div
                        onClick={() => handleLikeProduct(item)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
                    >
                        {item?.likedby.includes(data.payload?.username) ? (
                            <AiFillHeart size={26} className="text-red-500" />
                        ) : (
                            <AiOutlineHeart size={26} className="text-red-500" />
                        )}
                    </div>
                </div>

                <Carousel
                    arrows
                    autoplay
                    autoplaySpeed={3000}
                    infinite={true}
                    effect="fade"
                >
                    {item?.product_images?.map((image, index) => (
                        <div
                            className="overflow-hidden rounded-3xl bg-black"
                            key={index}
                        >
                            <img
                                src={image}
                                className="scale-75 transition-transform hover:scale-90"
                                style={contentStyle}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="mt-3 flex flex-col gap-2 px-2">
                <h1 className="text-2xl font-bold">
                    {item?.product_name}
                </h1>
                <div className="flex items-center gap-2">
                    <strong className="text-2xl text-[#000000]">
                        ${item?.sale_price}
                    </strong>
                    <strong className="text-xl text-[#00000041] line-through">
                        ${item?.original_price}
                    </strong>
                </div>
                <div className="my-2 h-[1px] w-full bg-slate-300"></div>
                <div className="mb-0 flex justify-center">
                    <Link
                        className="text-lg font-medium text-sky-500"
                        to={`/product-details/${item?._id}`}
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CategoryList
