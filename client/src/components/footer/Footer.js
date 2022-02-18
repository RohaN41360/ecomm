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
              <li><Link to="/history">History</Link></li>
              <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
          </>
      )
  }
  return <div>
      <footer style={{height:"40vh"}}>
    <div class="wrapper">
      <small>&copy;2022 <strong>ScaleBasket</strong>, All Rights Reserved</small>
      <nav class="footer-nav">
                <h1>
                    <Link to="/" style={{color:"teal",paddingLeft:"20px"}}>{isAdmin ? 'Admin' : '❅⋆⋆ScaleBasket⋆⋆❅'}</Link>
                </h1>

        <Link to="/" style={{color:"#c74f78", display: 'inline-block'}}>{isAdmin ? 'Products' : 'Shop'}</Link>
        
        {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <Link style={{color:"#c74f78", display: 'inline-block'}} to="/login">Login ✥ Register</Link>
                }
        
        
        <a href="#">Back to Top</a>
        
      </nav>
    </div>
  </footer>
  </div>;
};

export default Footer;
