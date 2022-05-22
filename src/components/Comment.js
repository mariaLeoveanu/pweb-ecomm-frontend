import * as React from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export class Comment extends React.Component {
    render(){
        return(
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
           <ChatBubbleOutlineIcon/>
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
                       {this.props.comment}
                    </Typography>

                </React.Fragment>
            }
        />
    </ListItem>
        )
    }
}