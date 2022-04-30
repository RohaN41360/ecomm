import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import './products.css'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result
    
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="load_more">
            {
                result < page * 8 ? ""
                : <button onClick={() => setPage(page+1)} style={{border:'2px solid black',padding:'10px' ,margin:"10px"}} className="load_more_btn">Load more</button>
            }
        </div>
        </div> 
    )
}

export default LoadMore
