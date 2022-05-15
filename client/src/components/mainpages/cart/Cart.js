import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import Setowner from './Setowner'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [totalpay, setTotalpay] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
            setTotalpay(Math.round(total/75))
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const [owner,setowner] = useState([])
    const [shopname,setshopname] = useState("")
   
    
    console.log(shopname)
    useEffect(()=>{
        fetch("user/res",{
            headers: {Authorization: token}
        }).then(oner=>oner.json())
        .then(result=>{
            // console.log(result[0].shopname)
            setowner(result)
        })
    },[])



    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID,shopname, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div >
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>₹ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {/* <Setowner /> */}
                <div className='body'>
    <div className='select' style={{width:'200px'}}>
        {/* <label htmlFor="">Select A Store:</label> */}
        <select name='format' id='format' onChange={(e)=>{setshopname(e.target.value)}} >
        <option selected disabled>Select  Store</option>
            {
                 owner.map(item=>{
                     return(
                            <option value={item.shopname}>{item.shopname}</option>
                     )
                 })
            }
        </select>
    </div>
    </div>

            </div>
            

            <div className="total">
                <h3>Total: ₹ {total}</h3>
                <PaypalButton
                total={totalpay}
                tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart
