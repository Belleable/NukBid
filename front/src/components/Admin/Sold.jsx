import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import Card from '../Card';

function Sold() {
    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetchSold = async () => {
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
        fetchSold()
    }, []);

    return (
        <>
        <AdminNav />
        <h4 className='bid-text'>สินค้าที่ปิดประมูลแล้ว</h4>
        <Card goods={goods}/>
        </>
    );
}

export default Sold