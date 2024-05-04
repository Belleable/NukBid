import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import Timer from './Timer';

function Card({goods, isDeletable = false}) {

    return (
        <>
            {goods.map((good, isDeletable) => (
                <Link key={goodindex} to={`/detail/${good.goodsID}`} style={{ textDecoration: 'none' }}> 
                    <div className='card'>
                        <span>{good.maxPrice}฿</span>
                        <Timer endTime = {good.endTime}/>
                        <h3>{good.goodsName}</h3>
                        {isDeletable && <button className='delete-btn'>ลบสินค้า</button>}
                    </div>
                </Link>
            ))}
        </>
    )
}

export default Card;