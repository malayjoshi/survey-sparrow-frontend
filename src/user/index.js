import React from 'react';
import UserNavbar from './UserNavbar';
import { Route,Switch} from 'react-router-dom';  
import HomePage from './homepage/HomePage';

//show dashboard in index of admin
class UserIndex extends React.Component{

    render(){

        return(
            <div>
                <UserNavbar/>

                <Switch> 
                    <Route path={`/user/homepage`} exact >
                        <HomePage/>
                    </Route>

                </Switch>
            </div>
            
            
    
        );
    }
//                 <Route path={`${this.props.match.path}/pharmacy`} component={AdminPharmacyIndex} />    

}

export default UserIndex;