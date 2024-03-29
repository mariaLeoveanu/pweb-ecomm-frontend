import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { OutlinedInput, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { actionCreators } from '../state';
import { bindActionCreators } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/blogs");
    }, [user, loading]);

    const togglePassword = () => {
        setVisible(!isVisible);
    };

    function sendLoginRequest(auth, email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                setCurrentUser(userCredential)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
    }


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>BE TOGETHER</h1>

            <Box style={{ padding: '5%', margin: '0 auto' }}
                sx={{
                    boxShadow: 3,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    borderRadius: 2,
                    textAlign: 'center',
                    width: '70%',
                    fontWeight: '700',
                }}
            >
                <h2> Login here</h2>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField onChange={(e) => { setEmail(e.target.value); console.log(email) }} id="outlined-basic" label="Email" variant="outlined" />
                </Box><br />

                <OutlinedInput
                    style={{ margin: '1%', width: '25ch' }}
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
                /><br />
                <Button
                    style={{ margin: '1%' }}
                    variant="contained"
                    onClick={(e) => sendLoginRequest(auth, email, password)}>
                    Log in
                </Button><br />

                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </Box>
        </div>
    )
}

// onClick={() => logInWithEmailAndPassword(email, password)}>

export default Login