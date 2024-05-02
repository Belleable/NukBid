import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from "axios"
import Card from '../Card';

function Products() {
    const [goods, setGoods] = useState([])
    useEffect(() => {
        const fetchmyproducts = async () => {
            const res = await axios.get('http://localhost:3380/myproducts')
            if (res.data.success === true) {
                setGoods(res.data.data)
            }
            else {
                alert(res.data.text)
            }
        }

        fetchmyproducts()
    },[])
    return (
        <>
        <Nav />
        <div>My products</div>
        <Card deletable = {true} goods={goods}/>
        </>
    );
}

export default Products;