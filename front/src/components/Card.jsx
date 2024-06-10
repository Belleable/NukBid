import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Timer from './Timer';
import Pic from '../images/pic.jpg'

function Card({goods, isDeletable = false, handleDelete, isTimeShow = true, role}) {

    return (
        <>
            {goods?.map((good, goodindex) => (
                <div className='card' key={goodindex}>
                    <Link style={{ textDecoration: 'none' }} to={`/${role}/detail/${good._id}`}> 
                        <div>
                            <img src={`http://localhost:3380/${good.image.data}`} alt="Product"  style={{'width': '200px'}} />
                            <div className='time-price'>
                                <span className='price'>{good.maxPrice} ฿</span>
                                {isTimeShow && <Timer endTime = {good.endTime}/>}
                            </div>
                            <h2>{good.goodName}</h2>
                        </div>
                    </Link>
                    {isDeletable && <button className='delete-btn' onClick={() => handleDelete(good._id)}>ลบสินค้า</button>}
                </div>
            ))}
        </>
    );
}

export default Card;
