import React from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/pic.jpg';
import SearchBox from './SearchBox.jsx'


function Nav() {
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
            <img className='pfp' src={Pic} />
        </nav>
    );
}

export default Nav;