import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { history } from '../../utils/history';
import { authService } from '../../services/auth';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import LoginPage from '../LoginPage/LoginPage';

const App = () => {
  const [currentToken, setCurrentToken] = useState(null);

  useEffect(() => {
    const subscription = authService.currentToken.subscribe(x => {
      setCurrentToken(x);
    });
    return subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await authService.logout();
    history.push('/login');
  };

  return (
    <Router history={history}>
      <div>
        <div className="jumbotron">
          {currentToken && (
            <div style={{float: 'right'}}>
              <IconButton size="small" onClick={logout}>
                <span>{authService.getCurrentUserName()}</span>
                <ExitToAppIcon />
              </IconButton>
            </div>
          )}
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <PrivateRoute exact path="/" component={Home} />
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: 'calc(100vh - 100px)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Route path="/login" component={LoginPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export { App };
