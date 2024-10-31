import React, {useEffect, useRef, useState} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {addCategory} from "../../State/Admin/Action";
import {Alert, Snackbar} from "@mui/material";


export const CreateCategoryForm = () => {
    const [categoryName, setCategoryName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [pictureUrl1, setPictureUrl1] = React.useState(null);
    const [previewPictureUrl1, setPreviewPictureUrl1] = React.useState(null);

    const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
    const [successSnackBarMessage, setSuccessSnackBarMessage] = useState("");

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const handleCloseSuccessSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessSnackBarOpen(false);
    };

    // when click add product
    const handleAddCategory = async () => {
        const newCategory = {
            categoryName,
            description,
            picture: pictureUrl1,
            isActive: true
        };
        try {

            await addCategory(newCategory);

            setSuccessSnackBarMessage("Category added successfully");
            setSuccessSnackBarOpen(true);

        } catch (error) {
            if (error.response && error.response.data?.message) {
                setSnackBarMessage(error.response.data.message);
                setSnackBarOpen(true);
            } else if (!error.response) {
                setSnackBarMessage("Unable to connect to the server. Please check your network connection.");
                setSnackBarOpen(true);
            } else {
                setSnackBarMessage("An error occurred. Please try again later.");
                setSnackBarOpen(true);
            }
        }
    };

    // Handle file uploads for the two images
    const fileInputRef1 = useRef(null);

    const handleDivClick1 = () => {
        fileInputRef1.current.click();
    };

    const handleRemoveImage1 = () => {
        setPictureUrl1(null);
        setPreviewPictureUrl1(null);
    };

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



    return (
        <div>

            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={successSnackBarOpen}
                onClose={handleCloseSuccessSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSuccessSnackBar}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {successSnackBarMessage}
                </Alert>
            </Snackbar>

        <div className="w-full bg-gray-100 h-screen overflow-y-auto mt-12">
            <div className={"h-screen p-6"}>
                <div className={"flex border-b border-dashed border-border-base pb-5 md:pb-7"}>
                    <h1 className={"text-lg font-semibold text-heading text-[#1f2937]"}>Create New Category</h1>
                </div>
                <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Image</h4>
                        <p className={"text-sm text-body"}>Upload your category image here
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
                                   value={categoryName}
                                   onChange={(e) => setCategoryName(e.target.value)}
                                   autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
                        </div>

                        {/*Description*/}
                        <div className="mb-5">
                            <textarea
                                id="description"
                                name="description"
                                className="input-field px-4 py-2 h-40 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm text-left focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                rows={4}
                            />
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
                            data-label-id="0" onClick={handleAddCategory}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
</div>
    )
}
