import React, { useEffect, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom'; // To get categoryId from the route
import { getCategoryById, updateCategory } from '../../State/Admin/Action';
import {Alert, Snackbar} from "@mui/material"; // Assuming these are your API functions

export const UpdateCategoryForm = () => {
    const { categoryId } = useParams(); // Get categoryId from route
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [pictureUrl1, setPictureUrl1] = useState(null);
    const [previewPictureUrl1, setPreviewPictureUrl1] = useState(null);
    const [originalData, setOriginalData] = useState(null); // Track original data

    // State to manage if the form is edited
    const [isEdited, setIsEdited] = useState(false);

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

    // Fetch category data on component mount
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const data = await getCategoryById(categoryId);
                setOriginalData(data.result); // Store the original data for comparison
                setCategoryName(data.result.categoryName);
                setDescription(data.result.description);
                if (data.result.picture) {
                    setPreviewPictureUrl1(data.result.picture);
                }
            } catch (error) {
                console.error('Error fetching category', error);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    // Track changes in form fields and update the button state
    useEffect(() => {
        if (originalData) {
            const isFormEdited =
                categoryName !== originalData.categoryName ||
                description !== originalData.description ||
                pictureUrl1 !== null; // Check if a new picture is uploaded

            setIsEdited(isFormEdited);
        }
    }, [categoryName, description, pictureUrl1, originalData]);

    // Handle file uploads
    const fileInputRef1 = useRef(null);

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
                setSnackBarMessage("Error uploading the file. Please try again later.");
                setSnackBarOpen(true);
            }
        } catch (error) {
            console.error("Error uploading the file:", error);
            setSnackBarMessage("Error uploading the file. Please try again later.");
            setSnackBarOpen(true);
        }
    };

    const handleDivClick1 = () => {
        fileInputRef1.current.click();
    };

    const handleRemoveImage1 = () => {
        setPictureUrl1(null);
        setPreviewPictureUrl1(null);
    };

    const handleFileUpload1 = (event) => handleFileUpload(event, setPictureUrl1, setPreviewPictureUrl1);

    // Handle category update
    const handleUpdateCategory = async () => {
        const updatedCategory = {
            categoryName,
            description,
            picture: pictureUrl1, // In a real scenario, you might need to upload this to a server and get back a URL
            isActive: true, // Assuming isActive is handled here
        };

        try {
            await updateCategory(categoryId, updatedCategory);

            setSuccessSnackBarMessage("Category updated successfully.");
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
                    <h1 className={"text-lg font-semibold text-heading text-[#1f2937]"}>Update Category</h1>
                </div>

                {/* Image Upload Section */}
                <div className={"flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8"}>
                    <div className={"w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"}>
                        <h4 className={"text-base font-semibold text-body-dark mb-2"}>Image</h4>
                        <p className={"text-sm text-body"}>
                            Upload your category image here. Image size should not be more than <span className={"font-bold"}>2 MB</span>.
                        </p>
                    </div>
                    <div className={"rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3"}>
                        <div
                            className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer"
                            onClick={handleDivClick1}
                        >
                            <input
                                ref={fileInputRef1}
                                type="file"
                                className="hidden"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleFileUpload1}
                            />
                            <CloudUploadIcon />
                            <p className="mt-4 text-sm text-center text-body">
                                <span className="font-semibold text-accent text-[#009f7f]">Upload an image</span> or drag and drop PNG, JPG
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

                {/* Description Section */}
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <div className="w-full sm:w-4/12 px-0 pb-5 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
                        <h4 className="text-base font-semibold text-body-dark mb-2">Description</h4>
                        <p className="text-sm text-body">Add your category description here</p>
                    </div>

                    <div className="rounded bg-white p-5 shadow md:p-8 w-full sm:w-8/12 md:w-2/3">
                        <div className="mb-5">
                            <input
                                readOnly
                                id="name"
                                name="name"
                                type="text"
                                className="input-field px-4 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent h-10"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>

                        <div className="mb-5">
              <textarea
                  id="description"
                  name="description"
                  className="input-field px-4 py-2 h-40 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm text-left focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="sticky bottom-0 bg-gray-100 py-3 text-end">
                    <div className="flex items-center justify-end">
                        <button
                            className={`inline-flex items-center px-5 py-2 rounded text-white ${
                                isEdited ? 'bg-[#009f7f] hover:bg-accent-hover' : 'bg-gray-400'
                            }`}
                            onClick={handleUpdateCategory}
                            disabled={!isEdited} // Disable if no changes
                        >
                            {isEdited ? 'Save Changes' : 'No Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};
