import React, {useState} from 'react';
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {resetPassword} from "../State/Authentication/Action";  // For form validation



// Initial form values
const initialValues = {
    email: ''
};

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
});

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackBarOpen(false);
    };

    const handleCloseProcessSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setProcessSnackBarOpen(false);
    };

    const handleCloseSuccessSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccessSnackBarOpen(false);
    };

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const [processSnackBarOpen, setProcessSnackBarOpen] = useState(false);
    const [processSnackBarMessage, setProcessSnackBarMessage] = useState("");

    const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
    const [successSnackBarMessage, setSuccessSnackBarMessage] = useState("");

    // Handle form submission
    const handleSubmit = (values) => {

        setProcessSnackBarMessage("Please wait...");
        setProcessSnackBarOpen(true);

        dispatch(resetPassword({userData: values, navigate}))
            .then(() => {
                setProcessSnackBarOpen(false)
                setSuccessSnackBarMessage("Password reset is sent to your email");
                setSuccessSnackBarOpen(true);
            })
            .catch((error) => {
                setProcessSnackBarOpen(false)
                setSnackBarMessage(error.response.data.message);
                setSnackBarOpen(true);
            });


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
                open={processSnackBarOpen}
                onClose={handleCloseProcessSnackBar}
                autoHideDuration={20000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseProcessSnackBar}
                    severity="info"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {processSnackBarMessage}
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

            <Typography variant='h4' className='text-center'>
                Reset Password
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} // Add validation schema
                onSubmit={handleSubmit}  // Submit form values
            >
                {({ errors, touched }) => (
                    <Form>

                        <Field
                            as={InputField}
                            name='email'
                            label='Email'
                            fullWidth
                            margin='normal'
                            error={touched.email && Boolean(errors.email)} // Show error
                            helperText={touched.email && errors.email} // Display error message
                        />

                        {/* Submit Button */}
                        <Button
                            sx={{
                                mt: 3, padding: "1rem", backgroundColor: '#019376', '&:hover': {
                                    color: 'white',
                                }
                            }}
                            fullWidth
                            type='submit'
                            variant='contained'
                        >
                            <span style={{color: "#FFFFFF"}}>Reset My Password</span>
                        </Button>

                    </Form>
                )}
            </Formik>

            <Typography sx={{mt: 3}} variant='body2' align='center'>

                <Button
                    sx={{color: '#039375'}}
                    size='small'
                    onClick={() => navigate("/auth/login")}
                >
                    Back to login
                </Button>
            </Typography>
        </div>
    );
};

export default ResetPasswordForm;