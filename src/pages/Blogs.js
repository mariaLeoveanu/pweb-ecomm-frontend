import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../state/index"
import * as React from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SelectInput from "@mui/material/Select/SelectInput";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Blogs = () => {
    const [response, setResponse] = React.useState({});
    const store = useSelector((state) => state);

    React.useEffect(() => {
        // GET request using fetch inside useEffect React hook
        async function sleep() {
            console.log("sleep start");
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log("sleep done");
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(data => { setResponse(data) });
            console.log('i fire once');
        }
        sleep();



        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div>
            {console.log(response)}
            <h1>Blog Articles</h1>
            {/* {account} */}
            <br></br>
            {/* <button onClick={() => depositMoney(1000)}> Deposit </button>
            <button onClick={() => withdrawMoney(1000)}> withdraw </button> */}
            <br></br>
            {/* {counter.number} */}
            {/* <input onChange={event => setTitle(event.target.value)} /> */}

            {/* <input onChange={event => setCounter((prev) => ({
                ...prev, text: event.target.value
            }))} />
            {counter.text}
            <button onClick={() => setCounter(prevCounter => ({
                ...prevCounter, number: prevCounter.number + parseInt(counter.text)
            }))}> Counter increment </button>
            <button onClick={() => setCounter(prevCounter => ({
                ...prevCounter, number: prevCounter.number - parseInt(counter.text)
            }))}> Counter decrement </button> */}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {response.length >= 1 ? response.map((item, index) => {
                    return (
                        <div>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <h1>{index}</h1>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {item.body}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </div>)

                }) :
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                }
            </List>
            {console.log(store)}
        </div>
    );
};

export default Blogs;