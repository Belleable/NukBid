import React from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/pic.jpg';

function AdminNav() {
    return (
        <nav>
            <Link className='Logo' to='/admin'>Nuk-Bid</Link>
            <div>
                <ul>
                    <li><Link to='/admin' >หน้าหลัก</Link></li>
                    <li><Link to='/add-product' >เสร็จสิ้นแล้ว</Link></li>
                </ul>
            </div>
            <img className='pfp' src={Pic} />
        </nav>
    );
}

export default AdminNav;