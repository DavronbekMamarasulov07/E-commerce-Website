import { BiUserCircle } from "react-icons/bi";
import { BsFillBasket2Fill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Container from '../container/Container'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../images/dm.png"
import "./Navbar.css"

const items = [
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" >
                Clothers
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" >
                Electronics
            </a>
        ),
        key: '1',
    }
]


const Navbar = () => {

    const navigate = useNavigate()

    return (
        <Container>
            <div>
                <div className="flex items-center justify-between py-4">
                    <Link to="/" >
                        <img src={logo} alt="logo" width={160} className="ml-[-30px]" />
                    </Link>
                    <div className="">
                        <ul className="flex items-center gap-6">
                            <li>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space className='cursor-pointer '>
                                            Shop
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </li>
                            <li>
                                <NavLink >On Sale</NavLink>
                            </li>
                            <li>
                                <NavLink > New Arrivals</NavLink>
                            </li>
                            <li>
                                <NavLink >Brands</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <form className="flex items-center gap-3 bg-[#F0F0F0] w-[580px] py-3 px-4 rounded-[62px] ">
                            <BiSearch className="text-[#0000005f] text-2xl" />
                            <input type="text" placeholder='Search for products...' className='search_input ' />
                        </form>
                    </div>
                    <div className="flex items-center gap-3 ">
                        <BsFillBasket2Fill className="text-[#000] text-2xl" />
                        <BiUserCircle onClick={() => navigate("/auth")} className="text-[#000] text-2xl" />
                    </div>
                </div>
                <div>
                    {

                    }
                </div>
            </div>
        </Container>
    )
}

export default Navbar
