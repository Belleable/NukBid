import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/pic.jpg';
import SearchBox from './SearchBox.jsx'


function Nav() {
    const [pfp, setPfp] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchPfp = async () => {
            try {
                const res = await axios.get("http://localhost:3380/userpfp");
                setPfp(res.data);
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
                    <li><Link to='/' >หน้าหลัก</Link></li>
                    <li><Link to='/bidding' >กำลังประมูล</Link></li>
                    <li><Link to='/myproducts' >สินค้าที่ได้</Link></li>
                </ul>
            </div>
            <SearchBox />
            <img className='pfp' src={pfp} />
        </nav>
    );
}

export default Nav;