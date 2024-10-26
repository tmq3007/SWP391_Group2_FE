import React from 'react'
import {NavbarHomePage} from "../../Navbar/NavbarHomePage";
import {useNavigate} from "react-router-dom";

const SuccessOrderShow = () => {
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate("/");
    }
    return (
        <div className='flex flex-col h-full w-full'>
            <div className="w-full h-[10%]">
                <NavbarHomePage/>
            </div>
            <div className='flex-grow flex items-center justify-center'>
                <button onClick={backToHomePage}>
                    Click
                </button>
            </div>
        </div>
    )
}
export default SuccessOrderShow
