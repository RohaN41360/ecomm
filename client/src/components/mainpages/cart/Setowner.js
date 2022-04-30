import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'


const Setowner = () => {

    const state = useContext(GlobalState)
    const [token] = state.token
    const [owner,setowner] = useState([])

    useEffect(()=>{
        fetch("user/res",{
            headers: {Authorization: token}
        }).then(oner=>oner.json())
        .then(result=>{
            // console.log(result[0].shopname)
            setowner(result)
        })
    },[])
  return (
      <div className='body'>
    <div className='select' style={{width:'200px'}}>
        {/* <label htmlFor="">Select A Store:</label> */}
        <select name='format' id='format'>
        <option selected disabled>Select  Store</option>
            {
                 owner.map(item=>{
                     return(
                            <option value={item._id}>{item.shopname}</option>
                     )
                 })
            }
        </select>
    </div>
    </div>
  )
}

export default Setowner