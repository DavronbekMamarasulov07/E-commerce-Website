import CategoryList from "../../components/category_list/CategoryList";
import Navbar from "../../components/navbar/Navbar";
import { DashboardTitle, Loading } from "../../utils";
import Container from "../../components/container/Container";
import CategoriesType from "../../components/categories_type/CategoriesType";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, notification } from "antd";
import axios from "../../api";

const Category = () => {
  const {category} = useParams();
  const [trigger, setTrigger] = useState(false);
  const [data] = useFetch("/auth/profile");

  const [{ payload }, loading] = useFetch(
    `/product/by?category=${category}`,
    trigger
  );

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

  return (
    <div>
      <Navbar />
      <Container>
        <DashboardTitle>Most popular products</DashboardTitle>
        <CategoriesType  category={category}/>
        <div className="grid grid-cols-4 gap-5 my-[50px]">
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
            : payload?.map((item) => (
                <CategoryList key={item._id} handleLikeProduct={handleLikeProduct} data={data} item={item} setTrigger={setTrigger} trigger={trigger} loading={loading} />
              ))}
        </div>

      </Container>
    </div>
  );
};

export default Category;
