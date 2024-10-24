import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Image, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { Clothers } from "../comments/Comments";
import { comment_clothers } from "../../db";
import "./Details.css"



const Details = ({ product }) => {
    const [count, setCount] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const carousel = useRef(null);
   


    const contentStyle = {
        height: '100%',
        
        color: '#fff',
        textAlign: 'center',
        background: '#000',
    };

    const handleDecrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
        else {
            notification.warning({
                message: 'Minimum quantity is 1',
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    const handleIncrementCount = () => {
        if (count < product?.number_in_stock) {
            setCount(count + 1);

        } else {
            notification.warning({
                message: 'Out of Stock',
                description: `Only ${product?.number_in_stock} available`,
            });

        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div >
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2 text-[#0000009a]">
                    Home <MdArrowForwardIos />
                </Link>
                <Link to={`/category-list/${product?.category}`} className="flex items-center gap-2 text-[#0000009a]">
                    {product?.category} <MdArrowForwardIos />
                </Link>
                <Link className="flex items-center gap-2 text-[#0000009a]">
                    {product?.product_type} <MdArrowForwardIos />
                </Link>
                <Link to={`/category-list/${product?._id}`} className="flex items-center gap-2 text-[#0000009a]">
                    {product?.product_name}
                </Link>
            </div>
            <div className="grid grid-cols-2  mt-9  border-b pb-10">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-3 ">
                        {product?.product_images?.map((image, index) => (
                            <div onClick={() => carousel.current.goTo(index)} className={currentIndex === index ? "image_card_active" : "image_card"} key={index}>
                                <img src={image} className="scale-75 " style={contentStyle} alt="image" />
                            </div>
                        ))}
                    </div>
                    <div className="rounded-3xl w-full max-w-[470px]">
                        <Carousel afterChange={(current) => setCurrentIndex(current)} ref={carousel} arrows autoplay autoplaySpeed={3000} infinite={true} fade >
                            {product?.product_images?.map((image, index) => (
                                <div className="rounded-3xl overflow-hidden bg-black " key={index}>
                                    <Image src={image} className="scale-75 transition-transform hover:scale-90" xstyle={contentStyle} alt="image" />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div>
                    <h2 className="text-[40px]">
                        {product?.product_name}
                    </h2>
                    <div className='flex items-center gap-3 my-3'>
                        <strong className='text-[#000000] text-[32px]'>${product?.sale_price}</strong>
                        <strong className='text-[#00000041] line-through text-[32px]'>${product?.original_price}</strong>
                        <div className="text-red-500 text-[18px]  bg-red-100 w-[70px] h-8 flex items-center justify-center rounded-full ">
                            -{Math.round(
                                100 - (100 * product?.sale_price) / product?.original_price
                            )}%
                        </div>
                    </div>
                    <div className="text-[#0000009a] text-lg mb-4 border-b pb-4">
                        {product?.description}
                    </div>
                    <div className="text-[#0000009a] text-lg mb-4 border-b pb-2">
                        {product?.description}
                    </div>
                    <div className="flex items-center justify-between mt-12 gap-5">
                        <div className="flex items-center gap-8 bg-[#F0F0F0] py-4 px-5 rounded-[62px]" >
                            <AiOutlineMinus className="cursor-pointer text-3xl font-bold" onClick={handleDecrementCount} />
                            <strong className="text-2xl">{count}</strong>
                            <AiOutlinePlus className="cursor-pointer text-3xl font-bold" onClick={handleIncrementCount} />
                        </div>
                        <div className="bg-[#000] text-white py-4 px-5 rounded-[62px] flex-1 text-center transition-transform hover:bg-[#1d1d1de9] active:scale-90">
                            Add to Cart
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex flex-col ">
                <h2 className="text-[28px] font-semibold my-8 flex items-center gap-2">All Reviews <span className="text-[#0000009a] text-lg mt-1">({comment_clothers.length})</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mb-[100px]">
                    {comment_clothers?.map(item => (
                        <Clothers key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Details;
