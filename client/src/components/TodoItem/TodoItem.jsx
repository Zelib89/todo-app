import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 20,
  },
  deleteIcon: {
    marginLeft: "auto",
  }
}));

export const TodoItem = (props) => {
    const {text, onRemove} = props;
    const classes = useStyles();
    const className = classNames(classes.card, 'todo-item');

    return (
        <Card
            className={className}>
            <CardContent>
                <Typography gutterBottom>
                    {text}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="small" onClick={onRemove}  className={classes.deleteIcon}>
                    <DeleteForeverIcon className={classes.icon} />
                </IconButton>
            </CardActions>
        </Card>
    )
};
