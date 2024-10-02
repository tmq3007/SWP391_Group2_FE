import React from 'react';
import { Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import * as Yup from "yup";
import {registerUser} from "../State/Authentication/Action";
import {useDispatch} from "react-redux";

// Initial values and validation schema
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    roles: ["CUSTOMER"]
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm Password is required"),
    phone: Yup.string().required("Phone number is required"),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const { confirmPassword, ...userData } = values;
        dispatch(registerUser({userData, navigate}));
    };

    return (
        <div>
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

                        <Button sx={{ mt: 3, padding: "1rem", color: '#039375' }} fullWidth type='submit'
                                variant='contained'>Register</Button>
                    </Form>
                )}
            </Formik>

            <Typography sx={{ mt: 3 }} variant='body2' align='center'>
                <hr style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .1,
                    borderColor: '#000000'
                }}
                    className="hr-text gradient"
                />
                Already have an account?
                <Button sx={{ color: '#039375' }} size='small' onClick={() => navigate("/auth/login")}>
                    Login
                </Button>
            </Typography>
        </div>
    );
};

export default RegisterForm;
