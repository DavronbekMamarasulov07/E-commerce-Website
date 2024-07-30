import { Modal, Button, notification, Image, InputNumber } from "antd";
import TableComponent from "../../../components/table/Table";
import { DashboardTitle } from "../../../utils";
import { useEffect, useState } from "react";
import ProductForm from "../../../components/product_form/ProductForm";
import axios from "../../../api"


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
      }, 300)
    } catch (error) {
      console.log(error)
    }
    setDeleteProduct(null)
  }

  const handleQuantityIncrement = async (id) => {
    try {
      const res = await axios.patch(`/product/product-increment/${id}`);
      setTimeout(() => {
        location.reload()
      }, 300)
      notification.success({
        message: 'Quantity Updated',
        description: 'Quantity has been incremented.',
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleQuantityDecrement = async (id) => {
    try {
      const res = await axios.patch(`/product/product-decrement/${id}`);
      setTimeout(() => {
        location.reload()
      }, 300)
      notification.success({
        message: 'Quantity Updated',
        description: 'Quantity has been decremented.',
      });
    } catch (error) {
      console.log(error)
    }
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
      render: (price) => `$${price}`,
      sorter: true,
      with: '30%',


    },
    {
      key: "Sprice",
      title: 'Price',
      dataIndex:`sale_price`,
      render: (price) => `$${price}`,
      sorter: true,
      with: '30%',


    },
    {
      key: "Stock",
      title: 'Quantity',
      dataIndex: 'number_in_stock',
      sorter: true,
      render: (quantity, record) => (
        <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'center', gap: '10px'}}>
          <Button danger disabled={quantity === 0} type="primary" onClick={() => handleQuantityDecrement(record._id)}>-</Button>
          <InputNumber min={0} value={quantity} style={{ display: 'flex', alignItems: 'center',  justifyContent: 'center' , width: '50px'  }} readOnly />
          <Button type="primary" onClick={() => handleQuantityIncrement(record._id)}>+</Button>
        </div>
      ),
    },
    {
      key: "Image",
      title: "Product Images",
      dataIndex: "product_images",
      render: (images) => <Image.PreviewGroup  preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }} > 

      {
        images?.slice(0, 3).map((image, index) => (
          <Image
            width={50}
            src={image}
            key={index}
          />
        ))
      }
    
    </Image.PreviewGroup>,
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
