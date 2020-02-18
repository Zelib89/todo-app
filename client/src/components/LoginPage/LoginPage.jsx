import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import * as Yup from 'yup';
import { authService } from '../../services/auth';

const styles = theme => ({
  margin: {
      margin: theme.spacing.unit * 2,
  },
  padding: {
      padding: theme.spacing.unit
  },
  width: '400px',
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    if (authService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{width: '400px'}}>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required")
          })}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authService.login(username, password).then(
              user => {
                const { from } = this.props.location.state || {
                  from: { pathname: "/" }
                };
                this.props.history.push(from);
              },
              error => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" name="username" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" name="password" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button disabled={isSubmitting} type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
              </Paper>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
