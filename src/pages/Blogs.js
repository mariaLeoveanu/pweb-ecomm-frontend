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

const Blogs = () => {

    const objects = [
        {
            title: "Leo",
            value: "Cea mai super"
        },
        {
            title: "Victor",
            value: "E mai naspa"
        }
    ]

    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { depositMoney, withdrawMoney } = bindActionCreators(actionCreators, dispatch)
    console.log(account)
    const [counter, setCounter] = React.useState({
        number: 0,
        text: ""
    });

    return (
        <div>
            <h1>Blog Articles</h1>
            {account}
            <br></br>
            <button onClick={() => depositMoney(1000)}> Deposit </button>
            <button onClick={() => withdrawMoney(1000)}> withdraw </button>
            <br></br>
            {counter.number}
            {/* <input onChange={event => setTitle(event.target.value)} /> */}

            <input onChange={event => setCounter((prev) => ({
                ...prev, text: event.target.value
            }))} />
            {counter.text}
            <button onClick={() => setCounter(prevCounter => ({
                ...prevCounter, number: prevCounter.number + parseInt(counter.text)
            }))}> Counter increment </button>
            <button onClick={() => setCounter(prevCounter => ({
                ...prevCounter, number: prevCounter.number - parseInt(counter.text)
            }))}> Counter decrement </button>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                {objects.map((item, index) => {
                    return (
                        <div>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src="public/favicon.ico" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  </div>)
                    
                })}
            </List>
        </div>
    );
};

export default Blogs;