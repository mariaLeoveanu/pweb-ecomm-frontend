import * as React from "react";
import { auth } from "../firebase";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const [user, setUser] = React.useState({})
    const [email, setEmail] = React.useState({})
    const [accessToken, setAccessToken] = React.useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            setEmail(user.email);
            setAccessToken(user.accessToken);
            console.log(user)
        });
        fetch('http://127.0.0.1:8000/user/' + email, {
            headers: {
                'Authorization': accessToken
            }})
            .then(response => response.json())
            .then(data => setUser(data))
    }, [email])

    const margin = {
        margin: "2%",
        alignItems: 'center',
        margin: '0 auto',
        padding: '1%'
    };

    const cities = ["Kiev", "Kharkiv", "Odessa", "Dnipro", "Donetsk", "Zaporizhzhia", "Lviv", "Mariupol"]

    function changeName(event){
        setUser({
                ...user,
                name:event.target.value
        })
    }

    function changeCity(event, value){
        setUser({
                ...user,
                location:value
        })
    }

    async function submitChanges(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'Authorization': accessToken },
            body: JSON.stringify({
                name: user.name,
                location: user.location
            })};

            await fetch ('http://127.0.0.1:8000/user/update/' + email, requestOptions);
            navigate("/blogs");

    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }} >Update your profile</h1>

            <Box style={{ padding: '5%', margin: '0 auto' }}
                sx={{
                    boxShadow: 3,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    borderRadius: 2,
                    textAlign: 'center',
                    width: '50%',
                    fontWeight: '700',
                }}
            >
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
                <TextField  onChange={(e) => changeName(e)} style={margin} value={user.name} id="outlined-basic" helperText="Your name" variant="outlined" /><br />
                <TextField inputProps={{ readOnly: true }} style={margin} value={user.email} id="filled-basic" helperText="Email address" variant="outlined" /> <br />
                <Autocomplete
                style = {margin}
                    disablePortal
                    id="combo-box-demo"
                    options={cities}
                    value={user.location}
                    sx={{ width: 300 }}
                    onChange={(e, value) => changeCity(e, value)}
                    renderInput={(params) => <TextField {...params} label="City of interest" />}
                />
                </Box>

                <Button style={margin} onClick={() => submitChanges()} variant="contained">Update profile</Button>
            </Box>
        </div>

    );
};

export default Profile;