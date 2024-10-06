import React,{useState} from 'react'
import { VendorNavbar } from './VerdorNavbar'
import VendorLeftBar from './VendorLeftBar'
import VendorRightBar from './VendorRightBar'
import {NavbarShop} from "../Navbar/NavbarShop";

const VendorDashboard = () => {
  const[selectedPage,setSelectedPage] = useState(1);
  
  return (
    <div className="w-full h-full overflow-hidden m-0">
      {/* Left Sidebar */}
      <NavbarShop className="w-[100vw] h-[10vh] px-5 z-50  lg:px-20 flex items-center"/>

      <div className='flex w-full h-[90vh] overflow-hidden'>
      <VendorLeftBar onSelect={setSelectedPage} />
      {/* Right Content Area */}
      <VendorRightBar selectedPage={selectedPage}/>
      </div>
    </div>
  );
};

export default VendorDashboard 