import React, { useState } from "react";
import { useAppDispatch } from "redux/hooks";

// MUI components imports
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    Collapse,
    IconButton,
    InputAdornment,
    OutlinedInput,
    FormControlLabel,
    Checkbox,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updateCustomerProfile } from "features/customers/customersThunk";
import { useNavigate } from "react-router-dom";

const EditAccountPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // state for storing password and handle error if passwords are not matched to eachother
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // State for password change section visibility
    const [showPasswordSection, setShowPasswordSection] = useState(false);

    // States for adress change section visability
    const [showBillingAdress, setShowBillingAdress] = useState(false);
    const [showShippingAddress, setShowShippingAddress] = useState(false);

    // State for updated data
    const [newCustomerData, setNewCustomerData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    const updatedCustomerData = {
        firstName: newCustomerData.firstName,
        lastName: newCustomerData.lastName,
        phone: newCustomerData.phone,
        password: password,
    };

    // Handlers to toggle password visibility. It takes currsnt state and changes it to oposit
    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(
            (prevShowPasswordConfirm) => !prevShowPasswordConfirm
        );
    };

    // Handler to toggle password change section visibility
    const handleClickShowPasswordSection = () => {
        setShowPasswordSection(
            (prevShowPasswordSection) => !prevShowPasswordSection
        );
    };

    const handleClickShowBillingAdressSection = () => {
        setShowBillingAdress((prevShowBillingAdress) => !prevShowBillingAdress);
    };
    const handleClickShowShippingAdressSection = () => {
        setShowShippingAddress(
            (prevShowShippinggAdress) => !prevShowShippinggAdress
        );
    };

    // Input pasword actions handelers
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirm(event.target.value);
    };

    //Handle data from input fileds
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomerData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    // Handle submit
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (showPasswordSection && password !== passwordConfirm) {
            setErrorMessage("Passwords do not match");
            return;
        }
        dispatch(updateCustomerProfile(updatedCustomerData));
    };

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8 }}>
                <Typography
                    variant='h4'
                    align='center'
                    sx={{
                        marginBottom: "16px",
                    }}
                >
                    Account Information
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                alignItems: "center", // Vertically center the content
                            }}
                        >
                            <Typography variant='subtitle1'>
                                First Name
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            sx={{
                                // By using & .MuiInputBase-input, we're telling the style system to target the .MuiInputBase-input class that is a child of the root element of the <TextField> component.
                                "& .MuiInputBase-input": {
                                    padding: "6px 8px",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                name='firstName'
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                alignItems: "center", // Vertically center the content
                            }}
                        >
                            <Typography variant='subtitle1'>
                                Last Name
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: "6px 8px",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                name='lastName'
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                alignItems: "center", // Vertically center the content
                            }}
                        >
                            <Typography variant='subtitle1'>Phone</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: "6px 8px",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                type='tel'
                                name='phone'
                                autoComplete='off'
                                placeholder='+49 (123) 456-7890'
                                inputProps={{
                                    pattern:
                                        "\\+49\\([1-9][0-9]{2}\\)[0-9]{3}-[0-9]{4}",
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Used to show data in Collaps by set and unset check mark */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showPasswordSection}
                                    onChange={handleClickShowPasswordSection}
                                />
                            }
                            label='Change Password'
                        />
                        {errorMessage && (
                            <Alert severity='error'>{errorMessage}</Alert>
                        )}
                        {/* Collaps used to wrap the content that should be shown or hidden based on the value of showPasswordSection.  */}
                        <Collapse
                            in={showPasswordSection}
                            sx={{
                                marginTop: "12px",
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant='subtitle1'>
                                        New Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    {/* OutlinedInput when you want more control over the input field's appearance or when you need to build a custom input component. It includes icon at the end of hiden password, and to better handle it used this component */}
                                    <OutlinedInput
                                        fullWidth
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name='newPassword'
                                        autoComplete='new-password'
                                        inputProps={{
                                            minLength: 8,
                                        }}
                                        onChange={handlePasswordChange}
                                        endAdornment={
                                            //used to add an adornment (icon) at the end of the input field. In this case, it's used to add a visibility toggle icon.
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                padding: "6px 8px",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center", // Vertically center the content
                                    }}
                                >
                                    <Typography variant='subtitle1'>
                                        Confirm New Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <OutlinedInput
                                        fullWidth
                                        type={
                                            showPasswordConfirm
                                                ? "text"
                                                : "password"
                                        }
                                        inputProps={{
                                            minLength: 8,
                                        }}
                                        name='newPasswordConfirm'
                                        onChange={handlePasswordConfirmChange}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPasswordConfirm
                                                    }
                                                >
                                                    {showPasswordConfirm ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                padding: "6px 8px",
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showBillingAdress}
                                    onChange={
                                        handleClickShowBillingAdressSection
                                    }
                                />
                            }
                            label='Change Billing adress'
                        />
                        <Collapse
                            in={showBillingAdress}
                            sx={{
                                marginTop: "12px",
                            }}
                        >
                            <Grid container spacing={2}></Grid>
                        </Collapse>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showShippingAddress}
                                    onChange={
                                        handleClickShowShippingAdressSection
                                    }
                                />
                            }
                            label='Change Shipping adress'
                        />
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            mt: 4,
                            gap: 2,
                        }}
                    >
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            onClick={() => navigate("/customer/account")}
                        >
                            Back
                        </Button>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Save Changes
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EditAccountPage;

// TODO Fill input fileds with deta from current state. make sure fileds with password are empty
