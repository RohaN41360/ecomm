import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Footer = () => {

  const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    const logoutUser = async () =>{
      await axios.get('/user/logout')
      
      localStorage.removeItem('firstLogin')
      
      window.location.href = "/";
  }

  const adminRouter = () =>{
      return(
          <>
              <li><Link to="/create_product">Create Product</Link></li>
              <li><Link to="/category">Categories</Link></li>
          </>
      )
  }


    const loggedRouter = () =>{
      return(
          <>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <div>
                  <li><Link style={{color:"#c74f78",fontSize:"25px" ,margin:'10px'}}  to="/history">History</Link></li>
              </div>
              <div>
                  <li><Link style={{color:"#c74f78",fontSize:"25px" ,margin:'10px'}} to="/" onClick={logoutUser}>Logout</Link></li>
              </div>
          </div>
          </>
      )
  }
  return <div>
      <footer style={{height:"50vh"}}>
    <div class="wrapper">
      <small>&copy;2022 <strong>ScaleBasket</strong>, All Rights Reserved</small>
      {/* <nav class="footer-nav"> */}
                <h1>
                    <Link to="/" style={{color:"teal",paddingLeft:"20px"}}>{isAdmin ? 'Admin' : '❅⋆⋆ScaleBasket⋆⋆❅'}</Link>
                </h1>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:"25px"}}>            
     <div style={{margin:"20px"}}> 
        <Link to="/" style={{color:"#c74f78", display: 'inline-block',fontSize:"25px"}}>{isAdmin ? 'Products' : 'Shop'}</Link>
    </div>    
     <div style={{margin:"20px"}}> 
        {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <Link style={{color:"#c74f78", display: 'inline-block',fontSize:"25px"}} to="/login">Login ✥ Register</Link>
                }
    </div>    
     <div style={{margin:"20px"}}>     
        <a href="#" style={{color:"#c74f78",fontSize:"25px"}}>Back to Top</a>
    </div> 
    </div>   
      {/* </nav> */}
    </div>
  </footer>
  </div>;
};

export default Footer;
