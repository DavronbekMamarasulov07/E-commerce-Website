import { Modal,Button } from "antd";
import TableComponent from "../../../components/table/Table";
import { useFetch } from "../../../hooks/useFetch";
import { DashboardTitle } from "../../../utils";
import { useState } from "react";
import ProductForm from "../../../components/product_form/ProductForm";


const Products = () => {

  const [data, loading] = useFetch("/product/all")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (

    <>
      <div className="flex justify-between items-center">
        <DashboardTitle>Products</DashboardTitle>
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <TableComponent ></TableComponent>
      <Modal 
        centered
        maskClosable={false}
        footer={null}
        title="Basic Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        <ProductForm setIsModalOpen={setIsModalOpen}/>
      </Modal>
    </>
  )
}



export default Products
