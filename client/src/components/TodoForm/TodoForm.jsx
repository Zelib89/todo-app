import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        alignItems: "center",
    },
    button: {
        height: "auto",
        marginLeft: 20,
    },
}));

export const TodoForm = (props) => {
    const { handleSubmit, handleChange, values } = props;
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <Container className={classes.container}>
                <TextField
                    className="todo-text-field"
                    name="text"
                    variant="outlined"
                    margin="dense"
                    value={values.text}
                    onChange={handleChange}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    size="large"
                    type="submit">
                    <SaveIcon />
                        Add
                    </Button>

            </Container>
        </form>
    )
};
