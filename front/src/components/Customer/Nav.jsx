import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/pic.jpg';
import SearchBox from './SearchBox.jsx';
import axios from "axios";

function Nav() {
    const [pfp, setPfp] = useState(null);

    useEffect(() => {
        const fetchPfp = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get("http://localhost:3380/navbarpic");
                setPfp(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPfp();
    }, []);

    return (
        <nav>
            <Link className='Logo' to='/'>Nuk-Bid</Link>
            <div>
                <ul>
                    <li><Link to='/user/home'>หน้าหลัก</Link></li>
                    <li><Link to='/user/status/bidding'>กำลังประมูล</Link></li>
                    <li><Link to='/user/status/win'>สินค้าที่ได้</Link></li>
                </ul>
            </div>
            <SearchBox />
            {pfp ? 
                <img className='pfp' src={`http://localhost:3380/${pfp.data}`} alt="Profile" style={{ width: '200px' }} /> 
                :
                <img className='pfp' src={Pic} alt="Default Profile" />
            }
        </nav>
    );
}

export default Nav;
