import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Card from '../Card';
import Head from '../Head';
import Banner from '../../images/Banner.png'
import './css/Home.css'

function Home() {
    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:3380/user/home')
                if (res.data.success === false) {
                    setAuth(false)
                } else {
                    setGoods(res.data.data)
                }
            } catch (error) {
                console.log(error.text)
            }
        }
        fetch()
    }, []);
    
    return (
        <>
            <Head title="หน้าหลัก" />
            <Nav />
            <main className='Home'>
                <img src={Banner} className='banner'/>
                <h4 className='bid-text'>สินค้าที่กำลังเปิดประมูล</h4>
                <div className='card-home'>
                    <Card goods={goods} role={'user'}/>
                </div>
            </main>
        </>
    );
}

export default Home;