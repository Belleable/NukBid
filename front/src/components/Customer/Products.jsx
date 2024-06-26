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
                const res = await axios.get('http://localhost:3380/user/products/win')
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
            <>.</>
            <main className='Products'>
                <h4 className='bid-text'>สินค้าที่ประมูลได้</h4>
                <div className='card-container'>
                    <Card isTimeShow = {false} goods={products} role={'user'}/>
                </div>
            </main>
        </>
    );
}

export default Products;