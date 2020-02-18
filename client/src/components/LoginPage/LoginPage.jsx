import React from 'react';
import { Formik, Field, Form } from 'formik';
import { authService } from '../../services/auth';
import './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('Login', this, props );
    if (authService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authService.login(username, password).then(
              user => {
                const { from } = this.props.location.state || {
                  from: { pathname: '/' }
                };
                this.props.history.push(from);
              },
              error => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default LoginPage;