import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router,Switch, Redirect} from 'react-router-dom';  
import login from './login/login'  ;
import cookie from 'react-cookies';
import UserIndex from './user/index';
import Logout from './logout/logout';

function PrivateRoutes(props){

  if(cookie.load('username')!==undefined && cookie.load('token')!==undefined)
    return(
      <Switch>
        <Route path="/user" component={UserIndex} />
      </Switch>
    );
  else
      return(
        <Redirect to="/logout" />
      );

}

const routing = (
  
  <Router> 
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    /> 
    
      <Switch>
        
        <Route path="/login" component={login} />
        <Route path="/logout" component={Logout} />
      
        <PrivateRoutes/>
        
        <Route exact path="/" component={login} />

      </Switch>  

     
  </Router>  
)  
ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
