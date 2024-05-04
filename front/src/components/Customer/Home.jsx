import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Nav from './Nav';
import Card from '../Card';

function Home() {
    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:3380/user/home')
                if (res.data.success === true) {
                    setGoods(res.data.data)
                } else {
                    setAuth(false)
                }
            } catch (error) {
                console.log(error.text)
            }
        }
        fetch()
    }, []);
    
    return (
        <>
            <Nav />
            {/* แทรกรูปแบนเนอร์ */}
            <h4 className='bid-text'>สินค้าที่กำลังเปิดประมูล</h4>
            <Card goods={goods} />
        </>
    );
}

export default Home;