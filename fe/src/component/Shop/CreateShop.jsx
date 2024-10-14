import React, {useEffect, useRef} from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useDispatch, useSelector} from "react-redux";


export const CreateShop = () => {
    const [shopName, setShopName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [contactNumber, setContactNumber] = React.useState("");
    const [logo, setLogo] = React.useState(null);
    const [coverImage, setCoverImage] = React.useState(null);
    const [previewLogo, setPreviewLogo] = React.useState(null);
    const [previewCoverImage, setPreviewCoverImage] = React.useState(null);

    const dispatch = useDispatch();

    {/* useEffect(() => {
        dispatch(getAllCountriesAction());
    }, [dispatch]);*/}


    const handleCreateShop = () => {
        const formData = new FormData();
        formData.append("shopName", shopName);
        formData.append("description", description);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("address", address);
        formData.append("contactNumber", contactNumber);

        if (logo) {
            formData.append("logo", logo);
        }
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        {/* dispatch(createShopAction(formData));*/}
    };

    // Handle file uploads for the logo and cover image
    const fileInputLogoRef = useRef(null);
    const fileInputCoverRef = useRef(null);

    const handleFileUploadLogo = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogo(file);
            setPreviewLogo(URL.createObjectURL(file));
        }
    };

    const handleFileUploadCover = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverImage(file);
            setPreviewCoverImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveLogo = () => {
        setLogo(null);
        setPreviewLogo(null);
    };

    const handleRemoveCoverImage = () => {
        setCoverImage(null);
        setPreviewCoverImage(null);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    return (
        <div className="w-full bg-gray-100 h-screen overflow-y-auto mt-8">
            <div className={"h-screen p-6"}>
                <div className={"flex border-b border-dashed border-border-base pb-5 md:pb-7 "}>
                    <h1 className={"text-lg font-semibold text-heading text-[#1f2937]"}>Create New Shop</h1>
                </div>

                {/* Logo Upload Section */}
                <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Shop Logo</h4>
                        <p className={"text-sm text-body"}>Upload your shop logo here</p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer" onClick={() => fileInputLogoRef.current.click()}>
                            <input ref={fileInputLogoRef} type="file" className="hidden" accept=".png, .jpg, .jpeg" onChange={handleFileUploadLogo} />
                            <CloudUploadIcon/>
                            <p className="mt-4 text-sm text-center text-body">
                                <span className="font-semibold text-accent text-[#009f7f]">Upload logo</span> or drag and drop
                            </p>
                        </div>
                        {previewLogo && (
                            <div className="mt-4 relative">
                                <img src={previewLogo} alt="Preview Logo" className="w-20 h-20 object-cover rounded" />
                                <button className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full" onClick={handleRemoveLogo}>X</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cover Image Upload Section */}
                <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Shop Cover Image</h4>
                        <p className={"text-sm text-body"}>Upload your shop cover image here</p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer" onClick={() => fileInputCoverRef.current.click()}>
                            <input ref={fileInputCoverRef} type="file" className="hidden" accept=".png, .jpg, .jpeg" onChange={handleFileUploadCover} />
                            <CloudUploadIcon/>
                            <p className="mt-4 text-sm text-center text-body">
                                <span className="font-semibold text-accent text-[#009f7f]">Upload cover image</span> or drag and drop
                            </p>
                        </div>
                        {previewCoverImage && (
                            <div className="mt-4 relative">
                                <img src={previewCoverImage} alt="Preview Cover" className="w-20 h-20 object-cover rounded" />
                                <button className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full" onClick={handleRemoveCoverImage}>X</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Basic Info</h4>
                        <p>Add your shop's basic information here</p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div className="mb-5">
                            <input type="text" className="input-field px-4 h-10 w-full rounded border border-border-base focus:border-accent" placeholder={"Shop Name"} value={shopName} onChange={(e) => setShopName(e.target.value)} />
                        </div>
                        <div className="mb-5">
                            <input type="text" className="input-field px-4 h-10 w-full rounded border border-border-base focus:border-accent" placeholder={"Description"} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Shop Address Section */}
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Shop Address</h4>
                        <p>Enter your shop address details</p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div className="mb-5">

                        </div>
                        <div className="mb-5">
                            <input type="text" className="input-field px-4 h-10 w-full rounded border border-border-base focus:border-accent" placeholder={"State"} value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                        <div className="mb-5">
                            <input type="text" className="input-field px-4 h-10 w-full rounded border border-border-base focus:border-accent" placeholder={"City"} value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="mb-5">
                            <input type="text" className="input-field px-4 h-10 w-full rounded border border-border-base focus:border-accent" placeholder={"Address"} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="mb-5">
                            <input type="text" className="input-field px-4 h-10 w-full rounded border border-border-base focus:border-accent" placeholder={"Contact Number"} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                        </div>
                    </div>
                </div>

                <button className="mt-4 py-2 px-6 bg-accent text-white rounded" onClick={handleCreateShop}>Create Shop</button>
            </div>
        </div>
    );
};
