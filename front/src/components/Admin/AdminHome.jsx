import React from 'react';
import AdminNav from './AdminNav';
import Card from '../Card';
import { Link } from "react-router-dom";
import axios from 'axios';

function AdminHome() {
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
        <AdminNav />
        <h4 className='bid-text'>สินค้าที่กำลังเปิดประมูล</h4>
        <Link to='/add-product' style={{ textDecoration: 'none' }}>เพิ่มสินค้า</Link>
        <Card goods={goods}/>
        </>
    );
}

export default AdminHome;