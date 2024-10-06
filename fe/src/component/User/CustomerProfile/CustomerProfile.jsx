import React from 'react'
import ProfileNav from './ProfileNav'
import ProfileInfo from './ProfileInfo'
import {AddressProfile} from "./AddressProfile";
import {Route, Routes} from "react-router-dom";
import ChangePassword from "./ChangePassword";
import {MyOrder} from "./MyOrder";
import {Wishlist} from "./Wishlist";

export const CustomerProfile = () => {
  return (
      <div className='sticky  lg:flex justify-between '>
          <div className='sticky h-[70vh] lg:w-[20%] bg-white mt-10 mr-4 rounded-lg'>
              <ProfileNav />
          </div>

          <div className='lg:w-[80%] bg-white mt-10 rounded-lg'>
              <Routes>
                  <Route path="/" element={<ProfileInfo/>}/>
                  {/* Route for Profile Info */}
                  <Route path="/profileinfo" element={<ProfileInfo/>}/>

                  {/* Route for Change Password */}
                  <Route path="/change-pass" element={<ChangePassword/>}/>

                  {/* Route for My Orders */}
                  <Route path="/orders" element={<MyOrder/>}/>

                  <Route path="/wishlist" element={<Wishlist/>}/>

              </Routes>
          </div>


      </div>
  )
}
