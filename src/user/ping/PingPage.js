import React, { useState ,useEffect} from 'react';
import { Grid,Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import config from '../../config';
import { Redirect, useParams } from "react-router-dom";
import cookie from 'react-cookies';
import dateFormat from 'dateformat';

export default function PingPage(){
    let {id}=useParams();
    let [url, setUrl] = useState(null);
    let [redirect,setRedirect]=useState(null);
    
    let[logs,setLogs]=useState([]);
    let[ind,setInd]=useState(0);

    let fetchUrl=(id) => {
        axios.get(`${global.config.apiPath}/api/url/${id}`, 
        { headers: { Authorization: `Bearer ${cookie.load('token')}` } })
        .then(response => {
          //console.log(res.status);
          if(response.status===200) //authorized
          {
            setUrl(response.data);
          }

        }, (error) => {
          if(error.response.status===403){
            setRedirect("/login");
          }
          
        }
        );
    };

    let pingUrl=async(id)=>{
        
        let startTime=new Date();

        while(true){


         await  axios.post(`${global.config.apiPath}/api/ping/${id}`, 
            {},
            { headers: { Authorization: `Bearer ${cookie.load('token')}` } })
               .then(response => {
               //console.log(res.status);
               if(response.status===200) //authorized
               {
                   let obj={ind:ind, 
                       withinResponseTime:response.data.withinResponseTime,
                        time: `${dateFormat(`${response.data.time}`, "d-mm-yyyy, h:MM:ss TT")}` 
                    };
                    
                    

                   logs.push(obj);
                   
                   setLogs(logs);
                   ind+=1;
                   setInd(ind+1);
                   
                  
               }
   
               }, (error) => {
               if(error.response.status===403){
                   
                   setRedirect("/login");
               }
               
               }
               );
               
               await new Promise(resolve => setTimeout(resolve, 1000));

            if( Math.abs(new Date() -startTime)> config.timeInterval )
               break;

        }

        

    };

    useEffect(()=>pingUrl(id),[])

    if(url==null)
    {
        fetchUrl(id);
        
    }    


    if (redirect) {
        return <Redirect to={redirect} />
    }

    return(
        <div>
            <Grid container spacing={3} style={{ textAlign:"center",marginTop:"30px"} }>
                <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                   { url!=null && `Url: ${url.url}` }
                </Typography>
                
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                    { url!=null && `Response Time: ${url.responseTime}ms` }
                    
                    </Typography>
                    
                </Grid>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Alert severity="info">The pings will happen for a interval of 5 mins automatically and only failure cases will be saved.</Alert>
                </Grid>
            </Grid>

            <Grid container justify="center" spacing={3} style={{ textAlign:"center",marginTop:"30px"} }>
                
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><b>Message</b></TableCell>
                        <TableCell ><b>Time-stamp</b></TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>

                    {
                        logs.map(
                            (log) => 

                                <TableRow key={log.time}>
                                    <TableCell component="th" scope="row">
                                        {!log.withinResponseTime && `Website took more than ${url.responseTime}ms to respond.`}
                                        { log.withinResponseTime && `Took less than ${url.responseTime}ms to respond.` }
                                    </TableCell>
                                <TableCell >
                                {log.time}
                                </TableCell>
                                </TableRow>
                                    
                                
                                

                        )
                    }

                    </TableBody>
                </Table>
                </TableContainer>
                    
                
            </Grid>

        </div>
    );

}

