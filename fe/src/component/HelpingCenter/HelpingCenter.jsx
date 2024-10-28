import {NavbarHelp} from "../Navbar/NavbarHelp";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./HelpingCenterPage/Homepage";
import {SearchBar} from "./SearchBar";


export const HelpingCenter = () => {
    return (
        <section className="main flex flex-col h-screen">
            <NavbarHelp/>

            <div className="w-full">
                <SearchBar/>
            </div>
            <div className='w-full flex top-20 relative justify-center'>
            <Routes>
                    <Route path="/" element={<Homepage/>}/>

                    <Route path="/home-page" element={<Homepage/>}/>
                </Routes>
            </div>

        </section>
            );
            }