import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "../../api"

const TableCom = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
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
            render: (text, record, index) =>  tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'product_name',
            sorter: true,
            render: (name) => name,
            width: '20%',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: true,
            render: (category) => category,
            width: '20%',
        },
        {
            title: 'Product Type',
            dataIndex: 'product_type',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Price',
            dataIndex: 'original_price',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Price',
            dataIndex: 'sale_price',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Quantity',
            dataIndex: 'number_in_stock',
            sorter: true,
            width: '20%',
        },
        {
            title: "image",
            dataIndex: "product_images",
            render: (images) => <img src={images[0]} className='w-12 h-12 object-contain border-2' alt="image" />
        }



    ];
    const getRandomProductParams = (params) => ({
        pageSize: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const fetchData = () => {
        setLoading(true);
        axios("product/all",
            {
                params: getRandomProductParams(tableParams),
            })
            .then(res => {
                setData(res.data?.payload);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                    },
                });
            });
    };
    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <Table
            columns={columns}
            rowKey="_id"
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};
export default TableCom;