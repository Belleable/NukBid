import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/pic.jpg';
import SearchBox from './SearchBox.jsx'
import axios from "axios"

function Nav() {
    const [pfp, setPfp] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchPfp = async () => {
            try {
                const res = await axios.get("http://localhost:3380/usernav");
                setPfp(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPfp();
    }, []);

    return (
        <nav>
            <Link className='Logo' to='/'>Nuk-Bid</Link>
            <div>
                <ul>
                    <li><Link to='/user/home' >หน้าหลัก</Link></li>
                    <li><Link to='/user/products/bidding' >กำลังประมูล</Link></li>
                    <li><Link to='/user/products/win' >สินค้าที่ได้</Link></li>
                </ul>
            </div>
            <SearchBox />
            {pfp ? (<img className='pfp' src={pfp} />):(<img className='pfp' src={Pic} />)}
        </nav>
    );
}

export default Nav;