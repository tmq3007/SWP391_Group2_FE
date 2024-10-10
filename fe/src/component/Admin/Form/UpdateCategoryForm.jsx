import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Yup from 'yup';

const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    slug: Yup.string().required('Required'),
    details: Yup.string(),
    icon: Yup.string().required('Required'),
});

const UpdateCategoryForm = () => {
    return (
        <div style={{ padding: '40px', backgroundColor: '#f5f7f9', width: '600px', margin: 'auto', marginTop: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Update Category</h2>

            <Formik
                initialValues={{
                    name: '',
                    slug: '',
                    details: '',
                    icon: '',
                    type: '',
                }}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                            <CloudUploadIcon style={{ fontSize: 40, color: '#aaa' }} />
                            <p>Upload an image or drag and drop</p>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="upload-image"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    setFieldValue('image', file);
                                }}
                            />
                            <label htmlFor="upload-image" style={{ cursor: 'pointer', color: '#00bcd4' }}>
                                Upload an image
                            </label>
                            <p style={{ color: '#888', fontSize: '12px' }}>PNG, JPG</p>
                        </div>

                        <Field name="name">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : ''}
                                />
                            )}
                        </Field>

                        <Field name="slug">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Slug"
                                    variant="outlined"
                                    fullWidth
                                    error={errors.slug && touched.slug}
                                    helperText={errors.slug && touched.slug ? errors.slug : ''}
                                />
                            )}
                        </Field>

                        <Field name="details">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Details"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            )}
                        </Field>

                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Select Icon</InputLabel>
                            <Field name="icon" as={Select} label="Select Icon">
                                <MenuItem value="icon1">Icon 1</MenuItem>
                                <MenuItem value="icon2">Icon 2</MenuItem>
                                <MenuItem value="icon3">Icon 3</MenuItem>
                            </Field>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" style={{ alignSelf: 'flex-end' }}>
                            Add Category
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateCategoryForm;
