
import React from 'react';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
import Chip from '@material-ui/core/Chip';


class UserNavbar extends React.Component{ 
  
  constructor(props){
    super(props);
    this.state={

      styles:{
        root: {
          flexGrow: 1,
        },
      },
     

    };
    //this.handleLogout = this.handleLogout.bind(this);  
  }

  

  render(){

    
    return(

    <div style={this.state.styles.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
        
          <Grid container>
              <Grid item xs={12} md={9}>
                
                <Grid container>
                  <Grid item xs={12} md={1}>
                    
                    <Typography variant="h6">
                      
                      <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" href="/user/homepage">
                        My URLs
                      </Button>

                    </Typography>

                  </Grid>
                </Grid>

              </Grid>

              <Grid item xs={12} md={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                    <Chip label={ `Welcome, ${cookie.load('username')}` } />
                    
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Button color="inherit" href="/logout">Logout</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

        </Toolbar>
      </AppBar>
    </div>
  
  
    );

  }
  

}

export default UserNavbar;

