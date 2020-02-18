import React from 'react';
import { Router, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { history } from '../../utils/history';
import { authService } from '../../services/auth';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import LoginPage from '../LoginPage/LoginPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
  }

  async logout() {
    await authService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div>
          <div className="jumbotron">
            {currentUser && (
            <IconButton size="small" onClick={this.logout} >
              <ExitToAppIcon />
            </IconButton>
            )}
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <PrivateRoute exact path="/" component={Home} />
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    height: 'calc(100vh - 100px)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Route path="/login" component={LoginPage} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export { App };
