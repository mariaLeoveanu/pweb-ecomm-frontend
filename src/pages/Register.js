import Box from '@mui/material/Box';
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import { OutlinedInput, Button } from "@mui/material";
import { actionCreators } from '../state';
import { useNavigate } from "react-router-dom";
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
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(e) => { setName(e.target.value); console.log(name) }} id="outlined-basic" label="Full Name" variant="outlined" />
            </Box>
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
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(e) => { setPassword(e.target.value); console.log(password) }} id="outlined-basic" label="Password" variant="outlined" />
            </Box>
            <Button
                variant="outlined"
                onClick={() => registerFirebase(auth)}>
                Register
            </Button>
        </div>
    )
}

export default Register;