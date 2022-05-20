import * as React from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export class User extends React.Component {
    render(){
        return(
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
           <AccountCircleOutlinedIcon fontSize="large"/>
        </ListItemAvatar>
        <ListItemText
            primary={this.props.name}
            secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                       {this.props.email}
                       {this.props.location}
                    </Typography>

                </React.Fragment>
            }
        />
    </ListItem>
        )
    }
}