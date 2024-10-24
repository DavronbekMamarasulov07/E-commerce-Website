import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "../../api"

const TableComponent = ({columns, tableParams, setTableParams, url}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
   


   
    const getRandomProductParams = (params) => ({
        pageSize: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const fetchData = () => {
        setLoading(true);
        axios(url,
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
                        total: res.data?.total,
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
export default TableComponent;