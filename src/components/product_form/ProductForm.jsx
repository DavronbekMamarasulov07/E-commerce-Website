import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import "./ProductsForm.css"
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api"

const { TextArea } = Input;




const ProductForm = ({ setIsModalOpen, updateProduct, setUpdateProduct }) => {
    const authData = useSelector(state => state)
    const [categoryData] = useFetch("/product/category")
    const [productTypeData] = useFetch("/product/product-type")
    const [productImages, setProductsImages] = useState(null)
    const [form] = Form.useForm();



    

    


    const onFinish = async (values) => {
        const url = updateProduct ? `/product/update/${updateProduct._id}` : "/product/create";
        const method = updateProduct ? "PUT" : "POST";


        try {
            const response = await fetch("http://localhost:8000" + url, {
                method: method,
                headers: {
                    "Authorization": "Bearer " + authData.token
                },
                body: createFormData(values)
            });

            if (response.ok) {
                const message = updateProduct ? 'Product Updated' : 'Product Created';
                notification.success({
                    message: message,
                    description: 'Product has been ' + (updateProduct ? 'updated' : 'created') + '.',
                });
                setIsModalOpen(false);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            console.log(response)

        } catch (error) {
            console.error('Error:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to ' + (updateProduct ? 'update' : 'create') + ' product.',
            })
        }
    };

    const createFormData = (values) => {
        const form = new FormData();
        form.append("product_name", values.product_name);
        form.append("category", values.category);
        form.append("product_type", values.product_type);
        form.append("description", values.description);
        form.append("original_price", values.original_price);
        form.append("sale_price", values.sale_price);
        form.append("number_in_stock", values.number_in_stock);

        for (let i = 0; i < productImages.length; i++) {
            form.append("product_images", productImages[i]);
        }

        return form;
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue({
            ...updateProduct
        });
        if (updateProduct === null) {
            form.resetFields();
        }
    }, [updateProduct]);


    return (
        <div>
            <Form
                form={form}
                layout='vertical'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    marginTop: 12,
                    maxWidth: 500,

                }}
                initialValues={updateProduct}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="product_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter product name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div className="num_group grid grid-cols-2 items-center gap-3">

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter product category!',
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            maxCount={1}
                            style={{
                                width: '100%',
                            }}
                            options={categoryData.payload?.map(category => ({ key: category, label: category, value: category }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Product Type"
                        name="product_type"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter product type!',
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            maxCount={1}
                            style={{
                                width: '100%',
                            }}
                            options={productTypeData.payload?.map(type => ({ key: type, label: type, value: type }))}
                        />
                    </Form.Item>
                </div>

                <div className='num_group grid grid-cols-3 gap-3'>

                    <Form.Item
                        label="Original Price"
                        name="original_price"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter original price!',
                            },
                        ]}
                    >
                        <InputNumber min={1} className='w-full' />
                    </Form.Item>
                    <Form.Item
                        label="Sale Price"
                        name="sale_price"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter sale price!',
                            },
                        ]}
                    >
                        <InputNumber min={1} className='w-full' />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="number_in_stock"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter stock!',
                            },
                        ]}
                    >
                        <InputNumber min={1} className='w-full' />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter description!',
                        },
                    ]}
                >
                    <TextArea rows={4} style={{ resize: "none" }} />
                </Form.Item>

                <Form.Item
                    required
                    label="Product Images"
                    name="product_images"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter product images!',
                        },
                    ]}
                >
                    <div className="file_content">
                        <div className="file_box flex flex-col items-center justify-center w-full gap-2 border border-dashed border-gray-400 rounded-lg py-4 "  >
                            <p className="flex items-center justify-center w-full text-3xl text-sky-500" >
                                <AiOutlineCloudUpload />
                            </p>
                            <p className=" text-xl ">Click or drag file to this area to upload</p>
                            <p className=" text-[12px] leading-normal text-gray-400 text-center">
                                PNG, JPG, JPEG, GIF , WEBP, MP4
                            </p>
                        </div>
                        <input type="file" multiple accept="image/jpeg,image/webp,image/png,image/jpg,video/mp4" name="file" className="input_file" onChange={(e) => setProductsImages(e.target.files)} />
                    </div>

                </Form.Item>




                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductForm
