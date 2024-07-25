import { Modal, Button, notification } from "antd";
import TableComponent from "../../../components/table/Table";
import { DashboardTitle } from "../../../utils";
import { useState } from "react";
import ProductForm from "../../../components/product_form/ProductForm";
import axios from "../../../api"
import Title from "antd/es/typography/Title";


const Products = () => {

  const [updateProduct, setUpdateProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setUpdateProduct(null)

  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdateProduct(null)

  };

  const handleUpdateProduct = (product) => {
    setUpdateProduct(product);
    setIsModalOpen(true);
  };


  const handleDeleteProduct = async () => {
    try {
      const res = await axios.delete(`/product/${deleteProduct._id}`);
      notification.error({
        message: 'Product Deleted',
        description: 'Product has been deleted.',
      });
      setTimeout(() => {
        location.reload()
      }, 200);
    } catch (error) {
      console.log(error)
    }
    setDeleteProduct(null)
  }

  const columns = [
    {
      title: 'No.',
      key: "id",
      render: (_, __, index) => tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
      width: '10%',
    },
    {
      key: "Product_name",
      title: 'Product Name',
      dataIndex: 'product_name',
      sorter: true,
      render: (name) => name,
      with: '30%',

    },
    {
      key: "Category",
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
      render: (category) => category,
      with: '30%',


    },
    {
      key: "Product_type",
      title: 'Product Type',
      dataIndex: 'product_type',
      sorter: true,
      with: '30%',


    },
    {
      key: "Oprice",
      title: 'Price',
      dataIndex: 'original_price',
      sorter: true,
      with: '30%',


    },
    {
      key: "Sprice",
      title: 'Price',
      dataIndex: 'sale_price',
      sorter: true,
      with: '30%',


    },
    {
      key: "Stock",
      title: 'Quantity',
      dataIndex: 'number_in_stock',
      sorter: true,
      with: '30%',


    },
    {
      key: "Image",
      title: "image",
      dataIndex: "product_images",
      render: (images) => <img src={images[0]} className='w-12 h-12 object-contain border-2' alt="image" />,
      with: '30%',
    },
    {
      key: "Action",
      title: 'Action',
      render: (_, record) => (
        <div className="flex items-center gap-2 ">
          <Button type="primary" onClick={() => handleUpdateProduct(record)}>Edit</Button>
          <Button danger type="primary" onClick={() => setDeleteProduct(record)}>Delete</Button>
        </div>
      ),
      with: '5%',
    }



  ];


  return (

    <>
      <div className="flex justify-between items-center">
        <DashboardTitle>Products 📦</DashboardTitle>
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <TableComponent columns={columns} tableParams={tableParams} setTableParams={setTableParams} url="/product/all" ></TableComponent>
      <Modal
        centered
        maskClosable={false}
        footer={null}
        title={updateProduct ? "Update Product" : "Add Product"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <ProductForm setIsModalOpen={setIsModalOpen} updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
      </Modal>
      <Modal
        centered
        maskClosable={false}
        title={`Delete ${deleteProduct?.product_name}`}
        open={Boolean(deleteProduct)}
        onOk={handleDeleteProduct}
        onCancel={() => setDeleteProduct(null)}
        okButtonProps={{
          danger: true
        }}
      >
        Are you really going to delete this product?
      </Modal>
    </>
  )
}



export default Products
