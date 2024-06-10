import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import Card from '../Card';
import { Link } from "react-router-dom";
import axios from 'axios';
import Head from '../Head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AdminHome() {
    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:3380/admin/home')
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
    console.log(goods)
    return (
        <>
            <Head title="หน้าหลัก"/>
            <AdminNav />
            <>.</>
            <h4 className='bid-text'>สินค้าที่กำลังเปิดประมูล</h4>
            <Link to='/admin/home/addproduct' className='add-btn-bg'>
                <FontAwesomeIcon className='add-btn' icon={faPlus} />
            </Link>
            <div className='card-container'>
                <Card goods={goods} role={'admin'}/>
            </div>
        </>
    );
}

export default AdminHome;