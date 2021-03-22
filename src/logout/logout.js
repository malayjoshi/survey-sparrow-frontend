import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from "react-router-dom";

//clear cookies and redirect to login
function Logout (props){

    cookie.remove('username', { path: '/' });
    cookie.remove('token', { path: '/' });

    //get cookies
    return(
        <Redirect to="/login" />
    );       




}

export default Logout;