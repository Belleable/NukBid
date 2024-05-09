import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Card from '../Card';
import axios from 'axios';
import Head from '../Head';

function Bid() {
    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetchBidding = async () => {
            try {
                const res = await axios.get('http://localhost:3380/user/products/bidding')
                if (res.data.success === true) {
                    setGoods(res.data.data)
                } else {
                    setAuth(false)
                }
            } catch (error) {
                console.log(error.text)
            }
        }
        fetchBidding()
    }, []);

    const handleDelete = async (goodsID) => {
        console.log(goodsID)
        try {
            const res = await axios.delete(`http://localhost:3380/user/products/bidding?goodsid=${goodsID}`)
            if (res.data.success === true) {
                goods.splice(goods._id, goodsID)
            }
        } catch (error) {
            console.log(error.text)
        }
    }

    console.log(goods)
    return (
        <>
            <Head title="กำลังประมูล" />
            <Nav />
            <h4 className='bid-text'>สินค้าที่ท่านกำลังประมูล</h4>
            <Card goods={goods} isDeletable={true} handleDelete={handleDelete}/>
        </>
    );
}

export default Bid;