import React from 'react'
import {NavbarHomePage} from "../../Navbar/NavbarHomePage";
import {useNavigate} from "react-router-dom";
import {Container} from "@mui/joy";

const SuccessOrderShow = () => {
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate("/");
    }
    return (
        <div className="flex-row align-items-center">
            <div className="h-[8%]">
                <NavbarHomePage></NavbarHomePage>
            </div>
            <div className="h-[92%] mt-9 bg-white ml-5 mr-5 rounded-lg grid grid-cols-3 p-2 gap-3"
                 style={{ gridTemplateColumns: '58.3% 20% 20%' }}>
                <div className="shadow-md rounded-lg p-2 ">OrderItems Detail</div>
                <div className="shadow-md rounded-lg p-2 ">OrderItems</div>
                <div className="shadow-md rounded-lg p-2 ">OrderCover information</div>
            </div>
        </div>

    )
}
export default SuccessOrderShow
