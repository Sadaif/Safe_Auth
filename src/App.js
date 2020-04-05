import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AuthApi from './AuthApi';
import Cookies from 'js-cookie'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';


function App() {
  const [auth, setAuth] = React.useState(false)
  const [accessToken, setAccessToken] = React.useState('')
  const [refreshToken, setRefreshToken] = React.useState('')

  
  React.useEffect(() => {
    const readCookie = () => {
      const Token = Cookies.get('Hex') 
      if (Token) {
        setAuth(true);
      }
    }
    readCookie();
  }, [])

  return (
    <AuthApi.Provider value={{ auth, setAuth, accessToken, setAccessToken, refreshToken, setRefreshToken }}>
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
}

export default App;




const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <Switch>
      <ProtectedLogin exact path="/" component={Login} auth={Auth.auth} />
      <ProtectedRoute exact path="/dashboard" auth={Auth.auth} component={Dashboard} />
    </Switch>
  )
}


const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}


const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      ) : (
          <Redirect to='/dashboard' />
        )
      }
    />
  )
}