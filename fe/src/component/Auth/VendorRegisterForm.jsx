import React from 'react';
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import * as Yup from "yup";
import {registerUser} from "../State/Authentication/Action";
import {useDispatch} from "react-redux";
import { useEffect, useState } from "react";

// Initial values and validation schema
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    roles: ["VENDOR"]
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string()
        .min(6, "Username must be at least 6 characters long")
        .required("Username is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm Password is required"),
    phone: Yup.string().required("Phone number is required"),
});

const VendorRegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackBarOpen(false);
    };
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleSubmit = async (values) => {
        const { confirmPassword, ...userData } = values;
        dispatch(registerUser({userData, navigate}))
            .catch((error) => {
                const errorResponse = error.response || {};
                const errorData = errorResponse.data || {};

                // Check error code or handle missing data
                const errorCode = errorData.code;

                if (errorCode === 1000) {
                    setSnackBarMessage("Username already exists");
                } else if (errorCode === 1008) {
                    setSnackBarMessage("Email already exists");
                } else {
                    console.log("Error response:", errorCode);
                    navigate("/auth/login");
                }

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

            <Typography variant='h4' className='text-center'>
                Register
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '1rem' }}>
                                <Field
                                    as={InputField}
                                    name="firstName"
                                    label="First Name"
                                />
                            </div>
                            <Field
                                as={InputField}
                                name="lastName"
                                label="Last Name"
                            />
                        </div>

                        <Field
                            as={InputField}
                            name="email"
                            label="Email"
                            fullWidth
                        />

                        <Field
                            as={InputField}
                            name="username"
                            label="Username"
                            fullWidth
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '1rem' }}>
                                <Field
                                    name="password"
                                    label="Password"
                                    component={PasswordInput} // Render PasswordInput with Field
                                />
                            </div>

                            <Field
                                name="confirmPassword"
                                label="Confirm Password"
                                component={PasswordInput} // Render PasswordInput with Field
                            />
                        </div>

                        <Field
                            as={InputField}
                            name="phone"
                            label="Phone Number"
                            fullWidth
                        />

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
                            <span style={{color: "#FFFFFF"}}>Register</span>
                        </Button>
                    </Form>
                )}
            </Formik>

            <Typography sx={{ mt: 3 }} variant='body2' align='center'>

                Already have an account?
                <Button sx={{ color: '#039375' }} size='small' onClick={() => navigate("/auth/login")}>
                    Login
                </Button>
            </Typography>
        </div>
    );
};

export default VendorRegisterForm;
