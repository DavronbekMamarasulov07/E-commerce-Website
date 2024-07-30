import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CategoriesType = ({ category }) => {
    const [categoriesData] = useFetch("product/category");
    const categories = categoriesData.payload || [];

    const categoryMenuItems = categories.map((category) => ({
        key: category,
        label: (
            <Link to={`/category-list/${category}`}>
                {category}
            </Link>
        )
    }));


    const categoryMenu = {
        items: categoryMenuItems
    };




    return (
        <div className="flex gap-3">
            <Dropdown
             menu={categoryMenu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {category ? category : "Categories"}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export default CategoriesType
