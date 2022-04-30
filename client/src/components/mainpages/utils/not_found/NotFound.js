import React from 'react'
import './not_found.css'
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
    useHistory
  } from "react-router-dom";

function NotFound() {
    const history = useHistory();
    return (
        <div>
            <div id='oopss'>
    <div id='error-text'>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
        <span>404 PAGE</span>
        <p class="p-a">
           . The page you were looking for could not be found</p>
        <p class="p-b">
            
        </p>
        <Link to="/" style={{textDecoration:'none',color:"ButtonText"}}>Go To Home Page</Link>


       {/* / <button class="button button1" style={{backgrondColor:ye''}}>{history.goBack}Go Back</button> */}
    </div>
</div>
  
  

        </div>
    )
}

export default NotFound
