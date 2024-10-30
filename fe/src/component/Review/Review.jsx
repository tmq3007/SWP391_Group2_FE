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

const Review = ({ open = true, onClose }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Write a Review</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <img src="https://via.placeholder.com/100" alt="Product" style={{ width: 100, height: 100, borderRadius: 8 }} />
                    <Typography variant="h6" style={{ fontWeight: '600' }}>Ash Double Bed</Typography>
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
                <Button onClick={() => { /* Handle submit logic here */ }} color="primary" variant="contained" style={{ fontWeight: 'bold' }}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Review;
