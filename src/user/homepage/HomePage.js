import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField,MenuItem, Container,Card,CardContent,Typography
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
          responseTime: 0,
          message:'',
          redirect: null,
          urls:[]
        };
        this.handleInputChange = this.handleInputChange.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.fetchUrls();
        

      }

      fetchUrls(){
        console.log(cookie.load('token') )
        axios.get(`${global.config.apiPath}/api/url`,
         { headers: { Authorization: `Bearer ${cookie.load('token')}` } })
        .then(response => {
            //console.log(res.status);
            if(response.status===200) //authorized
            {
            //show success message
            this.setState({urls: response.data });
            }

        }, (error) => {
            //logged out
            this.setState({redirect:'/logout'});
        }
        );

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
         {url:`${this.state.url}`,responseTime:this.state.responseTime},
         { headers: { Authorization: `Bearer ${cookie.load('token')}` } })
        .then(response => {
            //console.log(res.status);
            if(response.status===200) //authorized
            {
            //show success message
            this.setState({message:
                 <Alert severity="success" style={{marginTop:"20px"}}>URL added successfully.</Alert> });
            }

            this.fetchUrls()

        }, (error) => {
            //logged out
            this.setState({redirect:'/logout'});
        }
        );


    
      }

    render(){

        const preventDefault = (event) => event.preventDefault();

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        return(
            
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Container style={{ textAlign:"center",marginTop:"10px", }} >
                        
                        <Grid container spacing={3}>
                            <Grid item lg={6}>
                                
                                <TextField label="URL" type="url" name="url" value={this.state.url}
                        required onChange={this.handleInputChange} 
                        helperText="Please give full URL like http://www.google.com"/>
                            </Grid>

                            <Grid item lg={6}>
                                
                                <TextField label="Response Time (ms)" 
                                type="number"  InputProps={{
                                    inputProps: { 
                                        min: 0 
                                    }
                                }} name="responseTime" 
                                value={this.state.responseTime}
                        required onChange={this.handleInputChange}/>
                            </Grid>

                            <Grid item xs={12} > 
                                <Button variant="contained" type="submit" color="primary" >
                                    Add
                                </Button>

                                </Grid>
                            
                            <Grid item xs={12}>
                                {this.state.message}
                            </Grid>

                        </Grid>
                    </Container>
                
                </form>

                <Container style={{marginTop:"10px", }} >
                <List component="nav">
                {
                    this.state.urls.map(
                        (url) =>
                        <ListItem>
                            <Grid item xs={12}>
                                <a href={`/user/url/${url.id}`} onClick={preventDefault}>
                                    <ListItemText primary={url.url} />
                                </a>
                            </Grid>
                            <Grid item xs="12">
                                <ListItemText primary={`Response time (ms): ${url.responseTime}`}/>
                            </Grid>
                            
                        </ListItem>
                           
                    )
                }
                </List>
                </Container>
            </div>
            
    
        );
    }
}

export default HomePage;