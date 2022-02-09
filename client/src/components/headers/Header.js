import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)
     
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
    // const state = useContext(GlobalState)
    // const [categories] = state.categoriesAPI.categories

    // const [category, setCategory] = state.productsAPI.category
    // const [sort, setSort] = state.productsAPI.sort
    
    const [search, setSearch] = state.productsAPI.search


    // const handleCategory = e => {
    //     setCategory(e.target.value)
    //     setSearch('')
    // }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header style={{backgroundColor:"rgb(255,225,65)",display:"flex",justifyContent:"space-around"}}>
            
            <div className="menu"  onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo" style={{display:'flex'}}>
                <h1>
                    <Link to="/" style={{color:"teal",paddingLeft:"20px"}}>{isAdmin ? 'Admin' : '❅⋆⋆ScaleBasket⋆⋆❅'}</Link>
                </h1>
            </div>

            <div style={{display:'flex'}}>
            <input type="text" value={search} style={{textAlign:"center",width:"90vh",resize: 'vertical'}} placeholder="Search your Favourite products here!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            </div>

            <ul style={styleMenu} style={{display:'flex'}}>
                <li><Link to="/" style={{color:"black", display: 'inline-block'}}>{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link style={{color:"black", display: 'inline-block'}} to="/login">Login ✥ Register</Link></li>
                }

                <li onClick={() => setMenu(!menu)} style={{display:'flex'}}> 
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
