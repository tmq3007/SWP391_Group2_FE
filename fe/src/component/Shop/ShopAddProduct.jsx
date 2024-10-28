import React, {useEffect, useRef, useState} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useDispatch, useSelector} from "react-redux";
import {getAllCategoriesAction} from "../State/Category/Action";
import {createProductAction} from "../State/Product/Action";
import axios from "axios";


export const ShopAddProduct = () => {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [unitBuyPrice, setUnitBuyPrice] = useState("");
    const [unitSellPrice, setUnitSellPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [measurementUnit, setMeasurementUnit] = useState("");
    const [pictureUrl1, setPictureUrl1] = useState(null);
    const [pictureUrl2, setPictureUrl2] = useState(null);
    const [previewPictureUrl1, setPreviewPictureUrl1] = useState(null);
    const [previewPictureUrl2, setPreviewPictureUrl2] = useState(null);
    const [category, setCategory] = useState(null);
    const [shopId, setShopId] = useState("");
    const [isActive, setIsActive] = useState(true);

    const token = localStorage.getItem('jwt');

    const dispatch = useDispatch();
    const {categories} = useSelector((store) => store.categories || {});


    // Fetch categories on component mount
    useEffect(() => {
        dispatch(getAllCategoriesAction());
    }, [dispatch]);


    //get shopId by userId
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        let isMounted = true; // to prevent memory leaks
        axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (isMounted) setShopId(response.data.result);
            })
            .catch(error => {
                console.error("Error fetching shopId:", error);
            });

        return () => { isMounted = false; };
    }, [token]);

    // when click add product
    const handleAddProduct = () => {
        if (!productName || !unitBuyPrice || !unitSellPrice || !stock || !category || !shopId) {
            alert("Please fill out all required fields.");
            return;
        }

        const productData = {
            productName,
            description,
            unitBuyPrice,
            unitSellPrice,
            discount,
            stock,
            measurementUnit,
            category: category,
            shop: shopId,
            pictureUrl: pictureUrl1,
            pictureUrl2,
            isActive
        };

        dispatch(createProductAction(productData))
            .then(() => {
                console.log("Product created successfully!");
                alert("Product created successfully!");
            })
            .catch((error) => {
                console.error("Error creating product:", error);
                alert("Error creating product. Please try again.");
            });
    };


    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setCategory(selectedCategoryId);
        console.log("Selected Category ID:", selectedCategoryId);
    };


    // Handle file uploads for the two images
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);

    const handleFileUpload = async (event, setPictureUrl, setPreviewPictureUrl) => {
        const file = event.target.files[0];

        if (!file || file.size > 2 * 1024 * 1024) {
            alert("Please select a file smaller than 2MB.");
            return;
        }

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "first_time");
            data.append("cloud_name", "dkstc8tkg");

            const res = await fetch("https://api.cloudinary.com/v1_1/dkstc8tkg/image/upload", {
                method: "POST",
                body: data,
            });

            // Parse the JSON response
            const uploadedImage = await res.json();

            // Check if the response contains the uploaded image URL
            if (uploadedImage.url) {
                console.log("Image uploaded successfully:", uploadedImage.url);
                setPictureUrl(uploadedImage.url);
                setPreviewPictureUrl(URL.createObjectURL(file));
            } else {
                alert("Image upload failed.");
            }
        } catch (error) {
            console.error("Error uploading the file:", error);
            alert("There was an error uploading the file.");
        }
    };

    const handleFileUpload1 = (event) => handleFileUpload(event, setPictureUrl1, setPreviewPictureUrl1);
    const handleFileUpload2 = (event) => handleFileUpload(event, setPictureUrl2, setPreviewPictureUrl2);


    const handleDivClick1 = () => {
        fileInputRef1.current.click();
    };

    const handleDivClick2 = () => {
        fileInputRef2.current.click();
    };

    const handleRemoveImage1 = () => {
        setPictureUrl1(null);
        setPreviewPictureUrl1(null);
    };

    const handleRemoveImage2 = () => {
        setPictureUrl2(null);
        setPreviewPictureUrl2(null);
    };


    return (

        <div className="w-full bg-gray-100 h-screen overflow-y-auto mt-8">
            <div className={"h-screen p-6"}>
                <div className={"flex border-b border-dashed border-border-base pb-5 md:pb-7 "}>
                    <h1 className={"text-lg font-semibold text-heading text-[#1f2937]"}>Create New Product</h1>
                </div>
                <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Featured Image</h4>
                        <p className={"text-sm text-body"}>Upload your product featured image here
                            Image size should not be more than <span className={"font-bold"}>2 MB</span></p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div
                            className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none relative"
                            onClick={handleDivClick1}
                        >
                            <input
                                ref={fileInputRef1}
                                type="file"
                                className="hidden"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleFileUpload1}
                            />
                            <CloudUploadIcon/>
                            <p className="mt-4 text-sm text-center text-body">
                                        <span
                                            className="font-semibold text-accent text-[#009f7f]">Upload an image</span> or
                                drag and drop PNG, JPG
                            </p>
                        </div>
                        {previewPictureUrl1 && (
                            <div className="mt-4 relative">
                                <img src={previewPictureUrl1} alt="Preview" className="w-20 h-20 object-cover rounded" />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                    onClick={handleRemoveImage1}
                                >
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Gallery</h4>
                        <p className={"text-sm text-body"}>Upload your product image gallery here
                            Image size should not be more than <span className={"font-bold"}>2 MB</span></p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div
                            className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none relative"
                            onClick={handleDivClick2}
                        >
                            <input
                                ref={fileInputRef2}
                                type="file"
                                className="hidden"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleFileUpload2}
                            />
                            <CloudUploadIcon/>
                            <p className="mt-4 text-sm text-center text-body">
                                        <span
                                            className="font-semibold text-accent text-[#009f7f]">Upload an image</span> or
                                drag and drop PNG, JPG
                            </p>
                        </div>
                        {previewPictureUrl2 && (
                            <div className="mt-4 relative">
                                <img src={previewPictureUrl2} alt="Preview" className="w-20 h-20 object-cover rounded" />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                    onClick={handleRemoveImage2}
                                >
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Category</h4>
                        <p>Select product group and category from here</p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        {/*Categories*/}
                        <div className="mb-5">
                            <label htmlFor=""
                                   className="flex text-body-dark font-semibold text-sm leading-none mb-3">Category</label>
                            <div className="relative mt-2">
                                <select
                                    id="shop-select"
                                    onChange={handleCategoryChange}
                                    value={category}
                                    className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    style={{height: '50px', fontSize: '18px'}}
                                >
                                    {Array.isArray(categories.result) && categories.result.length > 0 ? (
                                        categories.result.map((cat) => (
                                            <option key={cat.categoryId} value={cat.categoryId}>
                                                {cat.categoryName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Loading categories...</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Description*/}
                <div className=" flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    {/*Left*/}
                    <div
                        className="description-section w-full sm:w-4/12 px-0 pb-5 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
                        <h4 className="text-base font-semibold text-body-dark mb-2"
                            data-label-id="0">Description</h4>
                        <p className="text-sm text-body">Add your product description and necessary information
                            from here</p>
                    </div>

                    {/*Right*/}
                    <div
                        className=" rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3 ">
                        {/*Name*/}
                        <div className="mb-5">
                            <input id="name" name="name" type="text"
                                   className="input-field px-4 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent h-10"
                                   placeholder={"Name"}
                                   value={productName}
                                   onChange={(e) => setProductName(e.target.value)}
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
                        </div>

                        {/*Measurement Unit*/}
                        <div className="mb-5">
                            <input id="unit" name="unit" type="text"
                                   className="input-field px-4 h-10 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                                   placeholder={"Measurement Unit"}
                                   value={measurementUnit}
                                   onChange={(e) => setMeasurementUnit(e.target.value)}
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
                        </div>

                        {/*Description*/}
                        <div className="mb-5">
                            <input id="description" name="description" type="text"
                                   className="input-field px-4 h-10 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                                   placeholder={"Description"}
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
                        </div>
                    </div>
                </div>

                {/*Product Infomation*/}
                <div className=" flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    {/*left*/}
                    <div
                        className="description-section w-full sm:w-4/12 px-0 pb-5 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
                        <h4 className="text-base font-semibold text-body-dark mb-2"
                            data-label-id="0">Product Infomation</h4>
                        <p className="text-sm text-body">Add your simple product description and necessary information from here</p>
                    </div>

                    {/*right*/}
                    <div className="rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3">
                        {/*Unit Buy Price*/}
                        <div className={"mb-5"}>
                            <input id="name" name="name" type="text"
                                   className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                   placeholder={"Unit Buy Price"}
                                   value={unitBuyPrice}
                                   onChange={(e) =>setUnitBuyPrice(e.target.value)}
                                   aria-invalid="false" data-label-id="0"/>

                        </div>

                        {/*Unit Sell Price*/}
                        <div className={"mb-5"}>
                            <input id="name" name="name" type="text"
                                   className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                   placeholder={"Unit Sell Price"}
                                   value={unitSellPrice}
                                   onChange={(e) => setUnitSellPrice(e.target.value)}
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                   aria-invalid="false" data-label-id="0"/>

                        </div>

                        {/*Stock*/}
                        <div className={"mb-5"}>
                            <input id="name" name="name" type="text"
                                   className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                   placeholder={"Stock"}
                                   value={stock}
                                   onChange={(e) => setStock(e.target.value)}
                                   aria-invalid="false" data-label-id="0"/>

                        </div>

                        {/*Discount*/}
                        <div className={"mb-5"}>
                            <input id="name" name="name" type="text"
                                   className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent "
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"
                                   placeholder={"Discount"}
                                   value={discount}
                                   onChange={(e) => setDiscount(e.target.value)}
                                   aria-invalid="false" data-label-id="0"/>

                        </div>
                    </div>
                </div>
                <div
                    className="sticky bottom-0 -mx-5 bg-gray-100/10 py-3 px-5 backdrop-blur text-end md:py-5 lg:-mx-8 lg:px-8 z-0">
                    <div className="flex items-center justify-end">
                        <button
                            data-variant="normal"
                            className="inline-flex items-center justify-center flex-shrink-0 bg-[#009f7f] text-white
                                font-semibold rounded outline-none transition duration-300 ease-in-out
                                focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 bg-accent
                                text-light border border-transparent hover:bg-accent-hover px-5 py-0 h-12 text-sm md:text-base"
                            data-metatip="true"
                            data-label-id="0" onClick={handleAddProduct}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}