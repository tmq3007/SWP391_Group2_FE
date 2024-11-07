import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Rating,
    TextField,
    Typography
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {createReview} from "../../../State/Feedback/Action";

const ReviewProduct = ({ open = true, onClose, productId, userId ,productImage}) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");


    console.log("he",productImage)
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };



    const handleSubmit = () => {
        const formData = {
            reviewText: description,  // use the current description state
            rating: rating,           // use the current rating state
            productName: productId,    // keep productId from props
            userId: userId             // keep userId from props
        };

        console.log("Submitting data:", formData);

        dispatch(createReview(formData,jwt));

        // Close the dialog after submitting
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Write a Review</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <img src={productImage} alt="Product" style={{width: 100, height: 100, borderRadius: 8}}/>

                    <Typography variant="h6" style={{fontWeight: '600'}}>{productId}</Typography>
                </div>
                <Typography variant="subtitle1" style={{ fontWeight: '500', marginBottom: '10px' }}>Give Ratings</Typography>
                <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    precision={0.5}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconButton component="label">
                        <UploadFile fontSize="large" color="primary" />
                        <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
                    </IconButton>
                    {uploadedImage && <Typography variant="body2">{uploadedImage.name}</Typography>}
                </div>
            </DialogContent>
            <DialogActions style={{ padding: '20px', justifyContent: 'center' }}>
                <Button onClick={onClose} color="secondary" variant="outlined" style={{ fontWeight: 'bold' }}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" style={{ fontWeight: 'bold' }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewProduct;