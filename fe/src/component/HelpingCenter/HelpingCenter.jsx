import {NavbarHelp} from "../Navbar/NavbarHelp";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./HelpingCenterPage/Homepage";
import {SearchBar} from "./SearchBar";
import Sidebar from "./Sidebar";
import {NewUserPage} from "./HelpingCenterPage/NewUserPage";
import {ExplorePage} from "./HelpingCenterPage/ExplorePage";
import {OrderPaymentPage} from "./HelpingCenterPage/OrderPaymentPage";


export const HelpingCenter = () => {
    return (
        <section className="main flex flex-col h-screen">
            <NavbarHelp/>

            <div className="w-full">
                <SearchBar/>
            </div>
            <div className='w-full flex top-20 relative justify-center'>
                <Sidebar/>
            <Routes>
                <Route path="/" element={<NewUserPage/>}/>

                <Route path="/new-user" element={<NewUserPage/>}/>

                <Route path="/explore" element={<ExplorePage/>}/>

                <Route path="/order-payment" element={<OrderPaymentPage/>}/>
                </Routes>
            </div>

        </section>
            );
            }