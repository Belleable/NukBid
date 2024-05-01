import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Card(product) {
    return (
        <div className="Card">
            {pets.map(product=>(
                <Link to={`/details/${product.goodsID}`} style={{ textDecoration: 'none' }} className='product' key={product.goodsID}>
                    {product.goodsID && <h3>{product.goodsName}</h3>}
                </Link>
            ))}
        </div>
    )
}

export default Card;