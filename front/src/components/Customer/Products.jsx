import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from "axios"
import Card from '../Card';
import Head from '../Head';

function Products() {
    const [products, setProducts] = useState([])

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3380/myproducts')
                if (res.data.success === true) {
                    setProducts(res.data.data)
                }
                else {
                    alert(res.data.text)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchMyProducts()
    },[])
    return (
        <>
        <Head title="สินค้าของคุณ" />
        <Nav />
        <h4 className='bid-text'>สินค้าที่ประมูลได้</h4>
        <Card goods={products}/>
        </>
    );
}

export default Products;