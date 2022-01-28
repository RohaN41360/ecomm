import React from 'react'
import BtnRender from './BtnRender'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="product_card" style={{borderRadius:"15px",boxShadow:"5px 10px 18px grey"}}>
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box" >
                <h2 title={product.title}>{product.title}</h2>
                <span>₹{product.price}</span>
                <p>{product.description}</p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem
