import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from "axios"
import Card from '../Card';

function Products() {
    const [goods, setGoods] = useState([])

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchmyproducts = async () => {
            try {
                const res = await axios.get('http://localhost:3380/myproducts')
                if (res.data.success === true) {
                    setGoods(res.data.data)
                }
                else {
                    alert(res.data.text)
                }
            } catch (error) {
                console.log(error.message)
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