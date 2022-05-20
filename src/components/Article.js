import * as React from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';

export class Article extends React.Component {

    render() {
        return (
            <div>
                <ListItem alignItems="flex-start" onClick={this.props.clickAction}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp"  variant='square' src={this.props.url} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {this.props.description}
                                </Typography>

                            </React.Fragment>
                        }
                    />
                </ListItem>
                <h5>For the full article click <a href={this.props.articleUrl}> here</a></h5>
            </div>

        )
    }
}