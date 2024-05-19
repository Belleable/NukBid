import React from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/pic.jpg'; {/**เดี๋ยวค่อยเอาโปรไฟล์ดีฟอลต์มาแทน */}

function AdminNav() {
    return (
        <nav>
            <Link className='Logo' to='/admin'>Nuk-Bid</Link>
            <div>
                <ul>
                    <li><Link to='/admin/home' >หน้าหลัก</Link></li>
                    <li><Link to='/admin/products/success' >เสร็จสิ้นแล้ว</Link></li>
                </ul>
            </div>
            <img className='pfp' src={Pic} />
        </nav>
    );
}

export default AdminNav;