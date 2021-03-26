import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField,Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Redirect, useParams } from "react-router-dom";
import cookie from 'react-cookies';
import dateFormat from 'dateformat';


function LogTable(props){
    return (

        <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><b>Message</b></TableCell>
                        <TableCell ><b>Time-stamp</b></TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.logs.map((log) => (
                        <TableRow key={log.id}>
                        <TableCell component="th" scope="row">
                            {log.message}
                        </TableCell>
                        <TableCell >
                        {dateFormat(`${log.time}`, "d-mm-yyyy, h:MM:ss TT")}
                        </TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

    );
}


export default function LogsPage(){

    const {id}=useParams();

    let [date,setDate]=useState('');

    let [logs,setLogs]=useState([]);
    let [redirect,setRedirect]=useState(null);

    let handleSubmit=(event) => {
        event.preventDefault();
        
        axios.get(`${global.config.apiPath}/api/logs-of-url/${id}?date=${date}`, 
            
            { headers: { Authorization: `Bearer ${cookie.load('token')}` } })
               .then(response => {
               //console.log(res.status);
               if(response.status===200) //authorized
               {
   
                   setLogs(response.data);
                   
               }
   
               }, (error) => {
               if(error.response.status===403){
                   
                   setRedirect("/login");
               }
               
               }
               );

    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div>

            <Typography variant="h4" gutterBottom style={{textAlign:"center",marginTop:"10px"}}>
                View Logs
            </Typography>

            <Grid container justify="center" style={{marginTop:"50px"}}>
                <form onSubmit={handleSubmit}>
                    <Grid item  xs={12}>
                    
                        <TextField
                          
                            label="Date"
                            type="date"
                            name="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            value={date}
                            onChange={ event => setDate(event.target.value) }
                        />
                    
                    </Grid>

                    <Grid item  xs={12} lg={12}>
                        <br></br>
                        <Button type="submit" color="primary" variant="contained">
                            Get Logs
                        </Button>
                    </Grid>

                </form>
            </Grid>

            <Grid container style={{marginTop:"40px"}}>
                
                { logs.length>0 && <LogTable logs={logs}/>}
            </Grid>

        </div>
    );
}

