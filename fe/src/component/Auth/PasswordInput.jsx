import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";

const PasswordInput = ({ label, field, form: { touched, errors }, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (event) => {
        // This updates Formik's state directly by calling Formik's field.onChange
        field.onChange(event);
    };

    return (
        <div>
            <InputLabel sx={{ mt: 3}} htmlFor={props.id || props.name}>
                {label}
            </InputLabel>
            <TextField
                {...field}
                {...props}
                type={showPassword ? "text" : "password"}
                fullWidth
                color="green"
                variant="standard"
                onChange={handlePasswordChange} // Handle password change
                error={touched[field.name] && Boolean(errors[field.name])} // Show error if the field is touched and has an error
                helperText={touched[field.name] && errors[field.name]} // Display error message
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default PasswordInput;