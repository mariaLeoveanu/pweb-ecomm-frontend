import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
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
import { auth } from "../firebase"
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';

const Blogs = () => {
    const [response, setResponse] = React.useState({});
    const [followers, setFollowers] = React.useState([]);
    const [selectedArticleId, setSelectedArticleId] = React.useState();
    const [articleComments, setArticleComments] = React.useState([]);
    const [email, setEmail] = React.useState("none")
    const [search, setSearch] = React.useState("none")
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [accessToken, setAccessToken] = React.useState("none")
    const navigate = useNavigate();
    const [followingMessage, setFollowingMessage] = React.useState("You are not following anybody!");
    const [commentText, setCommentText] = React.useState({})
    const [sendComment, setSendComment] = React.useState(false);
    const [user, setUser] = React.useState({});


    const style = {
        float: "left",
        width: "80%",
        padding: "5%"
    }

    const handleListItemClick = (event, index) => {
        if (selectedIndex === index) {
            setSelectedIndex(-1);
        } else {
            setSelectedIndex(index);
            console.log(followers[index])
        }
    }

    function action(id) {
        setSelectedArticleId(id);
    }

    async function signoutRedirect() {
        await auth.signOut()
        navigate('/')
    }

    async function refreshArticles() {
        await fetch('http://127.0.0.1:8000/news/refresh/' + email, {
            headers: {
                'Authorization': accessToken
            }
        });

        fetch('http://127.0.0.1:8000/news/get-news/' + email, {
            headers: {
                'Authorization': accessToken
            }
        })
            .then(response => response.json())
            .then(data => setResponse(data));

    }

    async function followUser(userEmail) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
            body: JSON.stringify({
                followed_user: {
                    email: userEmail
                },
                current_user: {
                    email: email
                }
            })
        };
        await fetch('http://127.0.0.1:8000/user/follow', requestOptions)

        fetch('http://127.0.0.1:8000/user/get-following/' + email, {
            headers: {
                'Authorization': accessToken
            }
        })
            .then(response => response.json())
            .then(data => setFollowers(data));

    }

    async function sendCommentPost() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
            body: JSON.stringify({
                email: email,
                id: selectedArticleId,
                comment: commentText
            })
        };
        await fetch('http://127.0.0.1:8000/comments/add-comment', requestOptions)

        fetch("http://127.0.0.1:8000/comments/" + selectedArticleId)
            .then(response => response.json())
            .then(data => setArticleComments(data));

        setSendComment(false);

    }


    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            setEmail(user.email);
            setAccessToken(user.accessToken);
            console.log(user)
        });
        fetch('http://127.0.0.1:8000/user/' + email, {
            headers: {
                'Authorization': accessToken
            }
        })
            .then(response => response.json())
            .then(data => setUser(data))
    }, [email])


    React.useEffect(() => {
        if (email !== "none") {
            fetch('http://127.0.0.1:8000/user/get-following/' + email, {
                headers: {
                    'Authorization': accessToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.length < 1) {
                        setFollowingMessage("You are not following anybody!")
                    }
                    setFollowers(data)
                });
        }

    }, [email])

    React.useEffect(() => {
        if (search !== "none") {
            fetch('http://127.0.0.1:8000/user/search/' + email + "/" + search, {
                headers: {
                    'Authorization': accessToken
                }
            })
                .then(response =>
                    response.json()
                )
                .then(data => {
                    console.log(data)
                    if (data.length > 0) {
                        setFollowers(data)
                    } else {
                        setFollowers([])
                        setFollowingMessage("No result")
                    }
                });
        }
        if (search === '') {
            if (email !== "none") {
                fetch('http://127.0.0.1:8000/user/get-following/' + email, {
                    headers: {
                        'Authorization': accessToken
                    }
                })
                    .then(response => response.json())
                    .then(data => setFollowers(data));
            }
        }
    }, [search])

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/news/get-news/' + email, {
            headers: {
                'Authorization': accessToken
            }
        })
            .then(response => response.json())
            .then(data => setResponse(data));

    }, [email]);

    React.useEffect(() => {
        fetch("http://127.0.0.1:8000/comments/" + selectedArticleId, {
            headers: {
                'Authorization': accessToken
            }
        })
            .then(response => response.json())
            .then(data => setArticleComments(data));
    }, [selectedArticleId]);

    return (
        <div>
            <div style={{ float: "right" }}>
                <IconButton onClick={() => refreshArticles()} aria-label="delete" color="primary">
                    <RefreshIcon />
                </IconButton>
                <IconButton onClick={signoutRedirect} color="primary">
                    <LogoutIcon></LogoutIcon>
                    Logout
                </IconButton>
                <IconButton
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate("/update-profile")}>
                    <AccountBoxIcon></AccountBoxIcon>
                    Update Profile
                </IconButton>
            </div>
            <h1 style={{ textAlign: "center" }} >{"Hello, " + user.name}</h1>
            <br></br>


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
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon style={{marginLeft: '2%', marginRight: '2%'}}></SearchIcon>
                        <TextField  style={{width: '80%'}}id="input-with-sx" label="Search a person" variant="standard" onChange={(e) => { setSearch(e.target.value); console.log(search) }} />
                    </Box>
                    <List sx={{ bgcolor: 'background.paper' }}>

                        {followers.length >= 1 ? followers.map((item, index) => {

                            return (
                                <div onClick={(event) => handleListItemClick(event, index)}>
                                    <User
                                        name={item.name}
                                        email={item.email}
                                        location={item.location}
                                        isFollowed={item.is_followed}
                                        followUser={() => followUser(item.email)}
                                        isSelected={selectedIndex === index}
                                        selectUser={() => handleListItemClick(item.is_followed ? index : -1)}
                                    />
                                </div>
                            )

                        }) :
                            <h2>{followingMessage}</h2>
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
                            if (selectedIndex !== -1) {
                                if (followers[selectedIndex].location === item.location)
                                    return (
                                        <div>
                                            <Article
                                                clickAction={() => action(item.id)}
                                                articleUrl={item.url}
                                                title={item.title}
                                                description={item.description}
                                                url={item.image_url} />
                                        </div>
                                    )
                            } else {
                                if (user.location === item.location) {
                                    return (
                                        <div>
                                            <Article
                                                clickAction={() => action(item.id)}
                                                articleUrl={item.url}
                                                title={item.title}
                                                description={item.description}
                                                url={item.image_url} />
                                        </div>
                                    )
                                }

                            }
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

                        <TextField id="comment_text" style={style}

                            onChange={(e) => setCommentText(e.target.value)}
                            label="Write a comment"
                            placeholder="Your text here..."
                            multiline
                            variant="standard"
                        />
                        <Button onClick={sendCommentPost} variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>

                    </List>
                </Box>
            </Stack>
        </div >
    );
};

export default Blogs;