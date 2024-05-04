import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import Timer from './Timer';

function Card({goods, deletable = false}) {

    return (
        <>
            {goods.map((good, goodindex) => (
                <Link key={goodindex} to={`/detail/${good.goodsID}`} style={{ textDecoration: 'none' }}> 
                    <div className='card'>
                        <img src={`data:${good.image.contentType};base64,${good.image.data}`} alt="Product" />
                        <span>{good.maxPrice}฿</span>
                        <Timer endTime = {good.endTime}/>
                        <h3>{good.goodsName}</h3>
                        {deletable && <button className='delete-btn'>ลบสินค้า</button>}
                    </div>
                </Link>
            ))}
        </>
    );
}

export default Card;
