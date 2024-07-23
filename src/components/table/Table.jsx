import { Button, Modal ,Typography,Table, Space, notification} from 'antd'
import ProductForm from '../../components/product_form/ProductForm';
import { useEffect, useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from '../../api'
import "./Table.css"

const { Title } = Typography




const TableComponent = ({ title, data, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [columns, setColumns] = useState([])
    const [updateProduct, setUpdateProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);


    

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
            }, 500);
        } catch (error) {
            console.log(error)
        }
        setDeleteProduct(null)

    };

    const handleUpdate = () => {
        console.log(updateProduct);
        setUpdateProduct(null)
    };



    useEffect(() => {
        if (data?.payload?.at(0)) {
            const { __v, _id, isAdmin, description,product_images,likedby,likes, ...rest } = data?.payload?.at(0)
            setColumns(Object.keys({ ...rest, actions: "Delete" }).map((key) => ({
                title: key, dataIndex: key, key, width: key === "description" && 400, className: "td-item", render: (item) => {
                    if (typeof item === "string" && item.startsWith("http")) {
                        return <img width={50} data-td-item={key} src={item} />
                    }
                    else {
                        return <span data-td-item={key}>{item}</span>
                    }
                }
            })))
        }

    }, [data])

    return (
        <>
            <div>
                <div className='flex items-center justify-between'>
                    <Title level={2}> {title}s</Title>
                    <Button onClick={showModal} type="primary">Add new {title}</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={data?.payload?.map(item => ({
                    ...item, key: item.id, actions: <div style={{ display: "flex", gap: 10 }}>
                        {
                            title === "Product" ?
                                <Button type="primary" danger onClick={() => setDeleteProduct(item)}><BsFillTrashFill /></Button>
                                :
                                <Button type="primary" danger onClick={() => setDeleteUser(item)}><BsFillTrashFill /></Button>

                        }
                        <Space />
                        {
                            title === "Product" && <Button type="primary" onClick={() => setUpdateProduct(item)}><AiFillEdit /></Button>
                        }
                    </div>
                }))}
                loading={loading}
                scroll={{
                    x: 1300,
                    y: 550
                }}
            />
            <Modal
                centered
                title={"Add new Product"}
                open={isModalOpen}
                maskClosable={false}
                onCancel={handleCancel}
                footer={null}
            >

                <ProductForm  setIsModalOpen={setIsModalOpen}/>
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
            <Modal
                centered
                maskClosable={false}
                className="update-product"
                title={`Update ${updateProduct?.name}`}
                open={Boolean(updateProduct)}
                onOk={handleUpdate}
                onCancel={() => setUpdateProduct(null)}
                okButtonProps={{
                    danger: true
                }}
                footer={null}
            >
                <ProductForm updateProduct={updateProduct} />
            </Modal>
        </>
    )
}

export default TableComponent
