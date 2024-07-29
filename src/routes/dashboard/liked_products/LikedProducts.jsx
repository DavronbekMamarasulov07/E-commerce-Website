import React, { useState, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { DashboardTitle, Loading } from '../../../utils';
import TableComponent from '../../../components/table/Table';
import { Table, Image } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const LikedProducts = () => {
  const [{ payload }, loading] = useFetch("/product/all");
  const [data, setData] = useState([]);

  console.log(payload)
  useEffect(() => {
    if (payload) {
      const filteredProducts = payload.filter(product => product.likes >= 1);
      setData(filteredProducts);
    }
  }, [payload]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns = [
    {
      title: 'No.',
      key: "id",
      render: (_, __, index) => tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
    },
    {
      key: "Product_name",
      title: 'Product Name',
      dataIndex: 'product_name',
      sorter: true,
    },
    {
      key: "Category",
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
    },
    {
      key: "Product_type",
      title: 'Product Type',
      dataIndex: 'product_type',
      sorter: true,
    },
    {
      key: "Oprice",
      title: 'Price',
      dataIndex: 'original_price',
      render: (price) => `$${price}`,
      sorter: true,
    },
    {
      key: "Sprice",
      title: 'Sale Price',
      dataIndex: 'sale_price',
      render: (price) => `$${price}`,
      sorter: true,
    },
    {
      key: "Stock",
      title: 'Quantity',
      dataIndex: 'number_in_stock',
      sorter: true,
    },
    {
      key: "Liked_by",
      title: 'Liked By',
      dataIndex: 'likedby',
      render: (likedby) => (
        <div key={uuidv4()} >
          {likedby && likedby.length > 0 ? 
            likedby.map(user => user[0].toUpperCase()).join(', ')
            : 'No likes'
          }
        </div>
      ),
      sorter: true,
    },
    {
      key: "Image",
      title: "Product Images",
      dataIndex: "product_images",
      render: (images) => <Image.PreviewGroup preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }} > 

      <div key={uuidv4()} className='flex gap-4'>
      {
        images?.map((image) => (
          <Image
            width={50}
            src={image}
          />
        ))
      }
      </div>
    
    </Image.PreviewGroup>,
      with: '30%',
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardTitle>Liked Products ❤️</DashboardTitle>
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        maxHeight={500}
        minHeight={500}
        overflow="hidden"
      />
    </div>
  );
}

export default LikedProducts;
