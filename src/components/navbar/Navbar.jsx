import { BiUserCircle } from "react-icons/bi";
import { BsFillBasket2Fill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Container from '../container/Container';
import { AutoComplete } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../images/dm.png";
import "./Navbar.css";
import { useState } from "react";
import axios from "../../api";


const Navbar = () => {
    const [searchData, setSearchData] = useState({ payload: [] });
    const navigate = useNavigate();
    
    

    const loadData = async (searchText) => {
        try {
            const res = await axios(`/product/search/${searchText}`);
            setSearchData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    return (
        <Container>
            <div>
                <div className="flex items-center justify-between py-4">
                    <Link to="/">
                        <img src={logo} alt="logo" width={160} className="ml-[-30px]" />
                    </Link>
                    <div>
                        <ul className="flex items-center gap-6">

                            
                            <li key="on-sale">
                                <NavLink>On Sale</NavLink>
                            </li>
                            <li key="new-arrivals">
                                <NavLink>New Arrivals</NavLink>
                            </li>
                            <li key="brands">
                                <NavLink>Brands</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <form className="flex items-center gap-3 bg-[#F0F0F0] w-[580px] py-1 px-4 rounded-[62px]">
                            <BiSearch className="text-[#0000005f] text-2xl" />
                            <AutoComplete
                                options={searchData.payload?.map((item) => ({
                                    label: <Link className="block" key={item._id} to={`/product-details/${item._id}`}>{item.product_name}</Link>
                                }))}
                                className="search_input"
                                onSelect={onSelect}
                                onSearch={(text) => text ? loadData(text) : setSearchData({ payload: [] })}
                                placeholder="Search for products..."
                            />
                        </form>
                    </div>
                    <div className="flex items-center gap-3">
                        <BsFillBasket2Fill className="text-[#000] text-2xl" />
                        <BiUserCircle onClick={() => navigate("/auth")} className="text-[#000] text-2xl" />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Navbar;
