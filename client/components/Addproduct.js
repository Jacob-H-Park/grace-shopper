import React from "react";

const AddProduct = ()=>{
    return(
        <form>
            <label>Product Name:</label>
            <input ></input>

            <label>Product Price:</label>
            <input ></input>

            <label>Product Category:</label>
            <select>
                <option>hello</option>
            </select>

            <label>Product Stock:</label>
            <input ></input>

            {/* to be able to upload images*/}
            <label>Product images:</label>
            
            <button type="submit">Submit</button>
        </form>
    )
}


export default AddProduct;