import React from 'react';
import {Button, Typography} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import InputField from "./InputField";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {loginUser} from "../State/Authentication/Action";  // For form validation

// Initial form values
const initialValues = {
    username: '',
    password: ''
};

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = (values) => {

            dispatch(loginUser({userData: values, navigate}));

    };

    return (



        <div>


            <Typography variant='h4' className='text-center'>
                Login
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} // Add validation schema
                onSubmit={handleSubmit}  // Submit form values
            >
                {({ errors, touched }) => (
                    <Form>

                        {/* Username Field */}
                        <Field
                            as={InputField}
                            name='username'
                            label='Username or Email'
                            fullWidth
                            margin='normal'
                            error={touched.username && Boolean(errors.username)} // Show error
                            helperText={touched.username && errors.username} // Display error message
                        />

                        {/* Password Field */}
                        <Field
                            name="password"
                            label="Password"
                            margin="normal"
                            component={PasswordInput} // Render PasswordInput with Field
                        />

                        {/* Submit Button */}
                        <Button
                            sx={{ mt: 3, padding: "1rem", color: '#039375' }}
                            fullWidth
                            type='submit'
                            variant='contained'
                        >
                            Login
                        </Button>

                    </Form>
                )}
            </Formik>

            <Typography sx={{ mt: 3 }} variant='body2' align='center'>

                Don't have an account?
                <Button
                    sx={{ color: '#039375' }}
                    size='small'
                    onClick={() => navigate("/auth/register")}
                >
                    Register
                </Button>
            </Typography>
        </div>
    );
};

export default LoginForm;