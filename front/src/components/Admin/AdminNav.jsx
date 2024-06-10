import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../images/Defaultprofile.png';
import logonukbid from '../../images/logonukbid.png';
import Defaultprofile from "../../../public/Defaultprofile.png";

function AdminNav() {
    const [active, setActive] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    return (
        // <nav className='navbar'>
        //     <Link className='Logo' to='/admin/home'><img className='logo' src={logonukbid} alt="Profile"/></Link>
        //     <div>
        //         <ul>
        //             <li><Link to='/admin/home' >หน้าหลัก</Link></li>
        //             <li><Link to='/admin/status/success' >เสร็จสิ้นแล้ว</Link></li>
        //         </ul>
        //     </div>
        //     <img className='pfp' src={Pic} />
        // </nav>

        <>
        <nav className='navbar'>
            <Link className='Logo' to='/admin/home'><img className='logo' src={logonukbid} alt="Profile"/></Link>
            <div className='menu'>
                <ul>
                    <li>
                        <Link 
                            to='/admin/home' 
                            onClick={() => {setActive('home')}} 
                            className={active==='home' ? 'active' : ''}
                        >หน้าหลัก
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/admin/status/success' 
                            onClick={() => setActive('win')}
                            className={active==='win' ? 'active' : ''}
                        >เสร็จสิ้นแล้ว
                        </Link>
                    </li>
                </ul>
            </div>
            <img src={Defaultprofile} alt="User Pfp" className='pfp'/>
            <div class="ham-menu" 
            onClick={() => {setIsToggled(!isToggled);}} 
            className={isToggled ? 'change' : ''} >
                <div class="bar1"></div>
                <div class="bar2"></div>
            </div>
        </nav>
        {isToggled? (
            <ul className='ham-menulist'>
                <li><Link to='/user/home' >หน้าหลัก</Link></li>
                <li><Link to='/admin/status/success' >เสร็จสิ้นแล้ว</Link></li>
            </ul>
        ):(<></>)}
        </>
    );
}

export default AdminNav;