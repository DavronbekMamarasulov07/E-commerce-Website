import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "../../api";
import {
  Carousel,
  notification,
  Button,
  Skeleton,
  Typography,
  Dropdown,
  Space,
} from "antd";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import Container from "../../components/container/Container";
import { Link } from "react-router-dom";
import CategoriesType from "../categories_type/CategoriesType";

const AllProducsts = ({}) => {
  const [trigger, setTrigger] = useState(false);
  const [{ payload }, loading] = useFetch("/product/all", trigger);
  const [step, setStep] = useState(1);
  let count = 4;

  const { Title } = Typography;
  const [data] = useFetch("/auth/profile");

  const handleLikeProduct = async (product) => {
    try {
      const res = await axios.patch(
        `/product/${product._id}/${product.likedby.includes(data.payload?.username) ? "unlike" : "like"}`,
      );

      if (res?.data?.payload?.message === "Liked") {
        notification.success({
          message: "Success",
          description: `You have liked this product.`,
        });
      } else {
        notification.warning({
          message: "Unliked",
          description: `You have unliked this product.`,
        });
      }
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: `Failed to like product.`,
      });
    }
  };

  const contentStyle = {
    height: "100%",
    color: "#fff",
    textAlign: "center",
    background: "#000",
  };

  return (
    <Container>
      <div className="my-[100px]">
        <div className="flex flex-col">
          <Title level={2}>All Products</Title>
          <CategoriesType />
        </div>
        <div className="mt-14 grid grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div className="flex flex-col items-center gap-5" key={index}>
                  <Skeleton.Image
                    active
                    style={{ width: "300px", height: "300px" }}
                  />
                  <Skeleton.Input
                    active
                    className="skeloton_input"
                    style={{ width: "250px", height: "30px" }}
                  />
                  <Skeleton.Input
                    active
                    className="skeloton_input"
                    style={{ width: "200px", height: "20px" }}
                  />
                  <Skeleton.Input
                    active
                    className="skeloton_input"
                    style={{ width: "250px", height: "20px" }}
                  />
                </div>
              ))
            : payload &&
              payload.slice(0, count * step).map((product) => (
                <div
                  className="product_card mb-[30px] gap-2 rounded-3xl"
                  key={product?._id}
                  >
                  <div className="relative h-[300px] w-[300px] overflow-hidden rounded-3xl bg-[#F0EEED]">
                    <div className="t-3 l-3 absolute z-10 flex w-full items-center justify-between px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base text-red-600">
                        {Math.round(
                          100 -
                            (100 * product.sale_price) / product.original_price,
                        )}
                        %
                      </div>
                      <div
                        onClick={() => handleLikeProduct(product)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
                      >
                        {product.likedby.includes(data.payload?.username) ? (
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
                      {product.product_images?.map((image, index) => (
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
                      {product?.product_name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <strong className="text-2xl text-[#000000]">
                        ${product?.sale_price}
                      </strong>
                      <strong className="text-xl text-[#00000041] line-through">
                        ${product?.original_price}
                      </strong>
                    </div>
                    <div className="my-2 h-[1px] w-full bg-slate-300"></div>
                    <div className="mb-0 flex justify-center">
                      <Link
                        className="text-lg font-medium text-sky-500"
                        to={`/product-details/${product?._id}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex justify-center">
          {payload && payload.length > count * step ? (
            <Button onClick={() => setStep(step + 1)} type="primary">
              Show More
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllProducsts;
