import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import "./ProductsForm.css"
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useSelector } from "react-redux";

const { TextArea } = Input;




const ProductForm = ({setIsModalOpen}) => {
    const authData = useSelector(state => state)
    const [categoryData] = useFetch("/product/category")
    const [productTypeData] = useFetch("/product/product-type")
    const [productImages, setProductsImages] = useState(null)
    const [form] = Form.useForm();


    // const onFinish = async (values) => {
    //     try {
    //         const res = await axios.put(`/product/${updateProduct.id}`, values)
    //         toast.success("Product Updated")
    //         if(res.data){
    //             location.reload()
    //         }
    //     } catch (error) {
    //         console.log(error)

    //     }
    //     setUpdateProduct(null)
    // };


    const onFinish = (values) => {
        const form = new FormData();
        form.append("product_name", values.product_name)
        form.append("category", values.category[0])
        form.append("product_type", values.product_type[0])
        form.append("description", values.description)
        form.append("original_price", values.original_price)
        form.append("sale_price", values.sale_price)
        form.append("number_in_stock", values.number_in_stock)

        for (let i = 0; i < productImages.length; i++) {
            form.append("product_images", productImages[i])
        }

        fetch("http://localhost:8000/product/create", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authData.token
            },
            body: form
        })
            .then(res => {
                if (res.ok) {
                    setIsModalOpen(true);
                    notification.success({
                        message: 'Product Created',
                        description: 'Product has been created.',
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                }
                return res.json();
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                    maxWidth: 500,
                }}
                initialValues={{
                    remember: true,
                }}
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
                            max Count={1}
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
