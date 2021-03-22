import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField,MenuItem, Container,Card,CardContent,Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import config from '../../config';
import { Redirect } from "react-router-dom";
import cookie from 'react-cookies';

class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
          url: '',
          message:'',
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
    
        this.setState({errorMessage:''});
        
        axios.post(`${global.config.apiPath}/api/url`,
         {url:`${this.state.url}`},
         { headers: { Authorization: `Bearer ${cookie.load('token')}` } })
        .then(response => {
            //console.log(res.status);
            if(response.status===200) //authorized
            {
            //show success message
            this.setState({message:
                 <Alert severity="success" style={{marginTop:"20px"}}>URL added successfully.</Alert> });
            }

        }, (error) => {
            //logged out
            this.setState({redirect:'/logout'});
        }
        );


    
      }

    render(){

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        return(
            
            <div>
                <form>
                    <Container style={{ textAlign:"center", }}>
                        
                        <Grid container spacing={3}>
                            <Grid item lg={12}>
                                
                                <TextField label="URL" type="url" name="url" value={this.state.url}
                        required onChange={this.handleInputChange}/>
                            </Grid>

                            <Grid item xs={12} > 
                                <Button variant="contained" type="submit" color="primary" >
                                    Add
                                </Button>

                                {this.state.message}
                                </Grid>

                        </Grid>
                    </Container>
                
                </form>

            </div>
            
    
        );
    }
}

export default HomePage;