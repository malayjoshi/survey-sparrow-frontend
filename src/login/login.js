import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField,MenuItem, Container,Card,CardContent,Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import config from '../config';
import { Redirect } from "react-router-dom";
import cookie from 'react-cookies';

  //message: <Alert severity="error" style={{marginTop:"10px"}}>Incorrect Mobile, Role combination / Password.</Alert>,

 

class login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      
      errorMessage:'',
      redirect: null 
    };
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
  }

  handleInputChange(event) {  
    const target = event.target;  
    const value = target.type === 'select' ? target.selected : target.value;  
    const name = target.name;  
    this.setState({  
        [name]: value  
    });  
  }  

  handleSubmit(event){

    event.preventDefault();

    if( this.state.password.length<4 )
    {
      this.setState({errorMessage: <Alert severity="error" style={{marginTop:"20px"}}>Check length of mobile/ password should be of min. 4 characters.</Alert>});
      
    }
    else{

      this.setState({errorMessage:''});

      const user={
        email: `${this.state.email}`,
        password: this.state.password 
      };
      
      axios.post(`${global.config.apiPath}/api/authenticate`, user)
        .then(response => {
          //console.log(res.status);
          if(response.status===200) //authorized
          {
            //save cookies
            cookie.save('username', response.data.name , { path: '/' });
            
            cookie.save('token',response.data.jwt,{ path: '/' });
            //redirect 
            this.setState({redirect: `/user/homepage` });
          }

        }, (error) => {
          if(error.response.status===403){

            this.setState({errorMessage: <Alert severity="error" style={{marginTop:"20px"}}>Invalid email Or password.</Alert>});
          }
          else {
            this.setState({errorMessage: <Alert severity="error" style={{marginTop:"20px"}}>An error occurred.</Alert>});
          }
        }
        );

    }


  }

  render(){

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return(

      <form  onSubmit={this.handleSubmit}>
          
      <Container style={{ width: 500, textAlign:"center", }} maxWidth="md" >
        <Card  variant="outlined">
          <CardContent>
            <Grid item xs={12}>
              <Typography variant="h2">Login</Typography>
            </Grid>
        

            <Grid item xs={12}>
              <TextField label="Email" type="email" name="email" value={this.state.email}
                 required onChange={this.handleInputChange}/>
                
            </Grid>
            
            <Grid item xs={12}>
              <TextField type="password" label="Password" name="password"
              value={this.state.password}  required onChange={this.handleInputChange}
              />
              
            </Grid>

            <Grid item xs={12} style={{marginTop:"20px"}}> 
              <Button variant="contained" type="submit" color="primary" >
                Submit
              </Button>

              {this.state.errorMessage}
            </Grid>
          </CardContent>
          </Card>      
        </Container>
      
      </form>

    );

  }

}


export default login;

