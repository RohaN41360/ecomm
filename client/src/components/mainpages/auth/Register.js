import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const [isclicked,setclick] = useState(false)

    return (
        <div className="login-page" style={{boxShadow:"0 10px 10px grey"}}>
        
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required autoComplete='off'
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                {/* <input type="number" name="role" required
                placeholder="Enter 1 for Owner Or 0 for Customer" value={user.role} onChange={onChangeInput} /> */}


                <div style={{display:'flex',justifyContent:'space-around'}}>
                <div>
                <input type="radio" style={{width:'50px'}}  id='owner' onClick={()=>setclick(!isclicked)} name='role' value={user.role} value='1' onChange={onChangeInput} />
                <label htmlFor="owner" style={{display:"flex",justifyItems:'center',justifyContent:'center'}}>Owner:</label>
                </div>
                <div>
                <input type="radio" style={{width:'50px'}}  id='customer' onClick={()=>setclick(!isclicked)} name='role' value={user.role} value='0' onChange={onChangeInput} />
                <label htmlFor="customer" style={{display:"flex",justifyItems:'center',justifyContent:'center'}}>Customer:</label>
                </div>

                </div>


                {isclicked && <input type="text" name="shopname" 
                placeholder="shopname" value={user.shopname} onChange={onChangeInput} /> }

                {/* <input type="text" name="shopname"  autoComplete='off'
                placeholder="shopname" value={user.shopname} onChange={onChangeInput} />        */}
                
                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit" style={{boxShadow:"0 10px 10px grey"}}>Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register