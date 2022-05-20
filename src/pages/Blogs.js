import { useSelector, useDispatch } from "react-redux"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux"
import { actionCreators } from "../state/index"
import { Article } from "../components/Article"
import { User } from "../components/User"
import { Comment } from "../components/Comment"
import * as React from "react"
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { getEmail } from '../state/store'
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { OutlinedInput, Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

const Blogs = () => {
    const [response, setResponse] = React.useState({});
    const [followers, setFollowers] = React.useState([]);
    const [selectedArticleId, setSelectedArticleId] = React.useState({});
    const [articleComments, setArticleComments] = React.useState([]);
    const [email, setEmail] = React.useState("none")
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const { setCurrentUser } = bindActionCreators(actionCreators, dispatch)
    const navigate = useNavigate();

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            setEmail(user.email);
        });
        console.log(email)
    }, [email])

    React.useEffect(() => {
        if(email !== "none"){
            fetch('http://127.0.0.1:8000/user/get-following/' + email)
            .then(response => response.json())
            .then(data => setFollowers(data));
        }

    }, [email])


    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/news/get-news')
            .then(response => response.json())
            .then(data => setResponse(data));

    }, [email]);



    // React.useEffect(() => {
    //     console.log(store)
    //     // if(auth.currentUser != null){
    //     //
    //     // }

    // }, [])

    React.useEffect(() => {
        fetch("http://127.0.0.1:8000/comments/" + selectedArticleId)
            .then(response => response.json())
            .then(data => setArticleComments(data));
    }, [selectedArticleId])

    function action(id) {
        setSelectedArticleId(id);
    }

    async function signoutRedirect() {
        await auth.signOut()
        navigate('/login')
    }

    return (
        <div>
            <h1>Blog Articles</h1>
            {/* {store.account.user.email} */}
            <br></br>
            <Button
                variant="outlined"
                onClick={signoutRedirect}>
                Logout
            </Button>
            <Stack direction="row" spacing={2}>
                <Box style={{ margin: '1%' }}
                    sx={{
                        boxShadow: 3,
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                        color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                        borderRadius: 2,
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: '700',
                    }}
                >
                    <List sx={{ bgcolor: 'background.paper' }}>

                        {followers.length >= 1 ? followers.map((item, index) => {
                            return (
                                <div>
                                    <User name={item.name} email={item.email} url={item.location} />
                                </div>
                            )

                        }) :
                            <h2>You are not following anybody!</h2>
                        }
                    </List>

                </Box>



                <Box style={{ margin: '1%' }}
                    sx={{
                        boxShadow: 3,
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                        color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                        borderRadius: 2,
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: '700',
                    }}
                >
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                        {response.length >= 1 ? response.map((item, index) => {
                            return (
                                <div>
                                    <Article clickAction={() => action(item.id)} articleUrl={item.url} title={item.title} description={item.description} url={item.image_url} />
                                </div>
                            )

                        }) :
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        }
                        <Divider variant="inset" component="li" />
                    </List>
                </Box>



                <Box style={{ margin: '1%' }}
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: '700',
                    }}
                >
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                        {articleComments.length >= 1 ? articleComments.map((item, index) => {
                            return (
                                <div>
                                    <Comment name={item.user.name} comment={item.content} />
                                </div>
                            )

                        }) :
                            <h2>This article doesn't have any comments.</h2>
                        }
                    </List>
                </Box>






            </Stack>



        </div>
    );
};

export default Blogs;