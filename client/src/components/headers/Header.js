import React, {useContext, useState,useEffect} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Upload from './icon/upload.svg'
import { createWorker } from "tesseract.js";


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [shop] = state.userAPI.shop
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
/////////////////////////ocr//////////////////////////////////
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const worker = createWorker({
    logger: (m) => {
      console.log(m);
    },
  });

  setInterval(function () {console.clear()}, 50000);
  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
    setSearch(text.toLowerCase())
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
  
  
  if(ocr) console.log(ocr)


    return (
        <header style={{backgroundColor:"rgb(255,225,65)",display:"flex",justifyContent:"space-around"}}>
            
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo" >
                <h1>
                    <Link to="/" style={{color:"teal",paddingLeft:"20px"}}>{isAdmin ? shop : '❅⋆⋆ScaleBasket⋆⋆❅'}</Link>
                </h1>
            </div>

            <div style={{display:'flex',alignContent:'center',alignItems:'center' }}>
            <input type="text" value={search} style={{textAlign:"center",width:"35vw",resize: 'vertical'}} placeholder="Search your Favourite products here!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            <div class="upload-btn-wrapper " style={{justifyContent:'center',alignItems:'center',cursor: 'pointer'}}>
                        <button class="btn" style={{backgroundColor:'yellow'}}><img src={Upload} alt="" width="20" /></button>
                        <form action="">
                        <input type="file" name="myfile" style={{cursor:'pointer'}}
                        //  onChange={(e)=>{console.log(e.target.files[0]); setimg(e.target.files[0])}} 
                        onChange={handleImageChange}/>
                        {/* <input type="submit" value="upload"/> */}
                        </form>
                    </div>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/" style={{color:"black", display: 'inline-block'}}>{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link style={{color:"black", display: 'inline-block'}} to="/login">Login ✥ Register</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
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
