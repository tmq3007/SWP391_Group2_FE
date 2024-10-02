import React from "react";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@mui/material";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props); // Hook from Formik to get field and meta info

    return (
        <div>
            <InputLabel sx={{ mt: 3 }} htmlFor={props.id || props.name}>
                {label}
            </InputLabel>
            <TextField
                {...field} // Spreading formik's field props to manage value and onChange
                {...props}
                color="green"
                fullWidth
                variant="standard"
                error={meta.touched && Boolean(meta.error)} // Handle validation errors
                helperText={meta.touched && meta.error} // Display error message
            />
        </div>
    );
};

export default InputField;