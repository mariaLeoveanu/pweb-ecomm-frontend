import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import { OutlinedInput, Button } from "@mui/material";
import { actionCreators } from '../state';
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
    const store = useSelector((state) => state);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    const [name, setName] = useState("")
    const dispatch = useDispatch();
    const { setCurrentUser } = bindActionCreators(actionCreators, dispatch)

    function sendRegisterRequest() {
        let status = 0;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        };
        fetch('http://127.0.0.1:8000/auth/register', requestOptions)
            .then(response => {
                if (response.ok) {
                    status = 1;
                    navigate("../blogs");
                }
                return response.json();
            })
            .then(data => setCurrentUser(data));
    }


    function registerFirebase(auth) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                sendRegisterRequest().then(() =>
                    setCurrentUser(userCredential)
                )
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
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
                <h2> Register here</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField style={{ margin: '1%' }} onChange={(e) => { setName(e.target.value); console.log(name) }} id="outlined-basic" label="Full Name" variant="outlined" />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField style={{ margin: '1%' }} onChange={(e) => { setEmail(e.target.value); console.log(email) }} id="outlined-basic" label="Email" variant="outlined" />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField style={{ margin: '1%' }} onChange={(e) => { setPassword(e.target.value); console.log(password) }} id="outlined-basic" label="Password" variant="outlined" />
                </Box>
                <Button style={{ margin: '1%' }}
                    variant="contained"
                    onClick={() => registerFirebase(auth)}>
                    Register
                </Button>
                <div style={{ margin: '1%' }}>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </Box>
        </div>
    )
}

export default Register;