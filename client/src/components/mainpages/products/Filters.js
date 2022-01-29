import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu" style={{padding:"5px",display:"flex"}}>
            <div className="row" style={{flex:"50%"}}> <center>
                {/* <span>Filters: </span> */}
                <select name="category" value={category} style={{border:"2px solid black"}} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id}   key={category._id}>
                                {category.name}
                            </option>
                        )) 
                    }
                </select></center>
            </div>

            {/* <input type="text" value={search} style={{textAlign:"center",border:"2px solid black"}} placeholder="Search your Favourite products here!"
            onChange={e => setSearch(e.target.value.toLowerCase())} /> */}

            <div className="row sort" style={{flex:"50%"}}>
                {/* <span>Sort By: </span> */} <center>
                <select value={sort} style={{border:"2px solid black"}}  onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select></center>
            </div>
        </div>
    )
}

export default Filters
