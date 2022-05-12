import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { OutlinedInput, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/blogs");
    }, [user, loading]);

    const togglePassword = () => {
        setVisible(!isVisible);
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(e) => { setEmail(e.target.value); console.log(email) }} id="outlined-basic" label="Email" variant="outlined" />
            </Box>
            <OutlinedInput
                id="outlined-adornment-password"
                type={isVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); console.log(password) }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                            edge="end"
                        >
                            {isVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
            <Button
                variant="outlined"
                onClick={() => logInWithEmailAndPassword(email, password)}>
                Log in
            </Button>

            <Button
                variant="outlined"
                onClick={() => signInWithGoogle()}>
                Log in with google
            </Button>

            <div>
                Don't have an account? <Link to="/register">Register</Link> now.
            </div>
        </div>
    )
}

export default Login