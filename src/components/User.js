import * as React from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export class User extends React.Component {
    render() {
        return (
            <div>
                <ListItem onClick={this.props.selectUser} selected={this.props.isSelected} alignItems="flex-start">
                    <ListItemAvatar>
                        <AccountCircleOutlinedIcon fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText><h3>{this.props.name}, {this.props.location}</h3>
                        {this.props.email}
                    </ListItemText>
                    {this.props.isFollowed == 0 &&
                        <IconButton onClick={this.props.followUser} color="primary" aria-label="add to shopping cart">
                            <AddIcon />
                        </IconButton>}
                </ListItem>
            </div>

        )
    }
}