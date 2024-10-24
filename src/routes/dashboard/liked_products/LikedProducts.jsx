import { useState, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { DashboardTitle } from '../../../utils';
import { Table, Image, Avatar, Tooltip } from 'antd';

const LikedProducts = () => {
  const [{ payload: products, loading: productsLoading }] = useFetch("/product/most-popular");
  const [{ payload: profileData, loading: profileLoading }] = useFetch("/auth/profile");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (profileData && products) {
      const userRole = profileData.role;
      if (userRole === "admin") {
        setData(products.filter(product => product.likes >= 1));
      } else if (userRole === "user") {
        setData(products.filter(product => product.likedby.includes(profileData.username)));
      }
    }
  }, [products, profileData]);

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
      render: (likedby) => {
        if (!likedby || likedby.length === 0) return 'No likes';

        const displayedUsers = likedby.length > 3 ? likedby.slice(0, 3) : likedby;
        const additionalCount = likedby.length > 3 ? `+${likedby.length - 3}` : '';

        return (
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              {displayedUsers.map((user, index) => (
            <Avatar.Group>
                <Tooltip key={index} title={user} placement="top">
                  <Avatar
                    style={{
                      backgroundColor: '#f56a00',
                      margin: '2px',
                    }}
                  >
                    {user.slice(0, 1).toUpperCase()}
                  </Avatar>
                </Tooltip>
              </Avatar.Group>
              ))}
              {additionalCount && (
                <Avatar.Group>
                <Tooltip title={`And ${likedby.length - 3} more`} placement="top">
                  <Avatar
                    style={{
                      backgroundColor: '#87d068',
                      margin: '2px',
                    }}
                  >
                    {additionalCount}
                  </Avatar>
                </Tooltip>
           </Avatar.Group>
              )}
          </div>
        );
      },
      sorter: true,
    },
    {
      key: "Image",
      title: "Product Images",
      dataIndex: "product_images",
      render: (images) => (
        <Image.PreviewGroup preview={{
          onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
        }}>
          <div className='flex gap-4'>
            {images?.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                width={50}
                src={image}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      ),
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
        loading={productsLoading || profileLoading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default LikedProducts;
