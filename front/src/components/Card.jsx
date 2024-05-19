import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Timer from './Timer';

function Card({goods, isDeletable = false, handleDelete}) {

    return (
        <>
            {goods.map((good, goodindex) => (
                <div key={goodindex}>
                    <Link to={`/detail/${good._id}`} style={{ textDecoration: 'none' }}> 
                        <div className='card'>
                            <img src={`http://localhost:3380/${good.image.data}`} alt="Product"  style={{'width': '200px'}} />
                            <span>{good.maxPrice}฿</span>
                            <Timer endTime = {good.endTime}/>
                            <h3>{good.goodName}</h3>
                        </div>
                    </Link>
                    {isDeletable && <button className='delete-btn' onClick={() => handleDelete(good._id)}>ลบสินค้า</button>}
                </div>
            ))}
        </>
    );
}

export default Card;
