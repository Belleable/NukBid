import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Defaultprofile from "../../../public/Defaultprofile.png"
import SearchBox from './SearchBox.jsx';
import axios from "axios";
import logonukbid from '../../images/logonukbid.png'

function Nav() {
    const [pfp, setPfp] = useState(null);
    const [isToggled, setIsToggled] = useState(false);
    const [active, setActive] = useState('');

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
        <>
        <nav className='navbar'>
            <Link className='Logo' to='/user/home'><img className='logo' src={logonukbid} alt="Profile"/></Link>
            <div className='menu'>
                <ul>
                    <li>
                        <Link 
                            to='/user/home' 
                            onClick={() => {setActive('home')}} 
                            className={active==='home' ? 'active' : ''}
                        >หน้าหลัก
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/user/status/bidding' 
                            className={active==='bid' ? 'active' : ''}
                            onClick={() => setActive('bid')}
                        >กำลังประมูล
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/user/status/win' 
                            onClick={() => setActive('win')}
                            className={active==='win' ? 'active' : ''}
                        >สินค้าที่ได้
                        </Link>
                    </li>
                </ul>
            </div>
            <SearchBox />
            {/* {pfp ? (<img className='pfp' src={Pic} />):(<img className='pfp' src={Pic} />)} */}
            {pfp?.data ? 
                <Link to='/user/profile' ><img className='pfp' src={`http://localhost:3380/${pfp.data}`} alt="Profile"/></Link>
                :
                <Link to='/user/profile' ><img src={Defaultprofile} alt="User Pfp" className='pfp'/></Link>
            }
            <div class="ham-menu" 
            onClick={() => {setIsToggled(!isToggled);}} 
            className={isToggled ? 'change' : ''} >
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
        </nav>
        {isToggled? (
            <ul className='ham-menulist'>
                <li><Link to='/user/home' >หน้าหลัก</Link></li>
                <li><Link to='/user/status/bidding' >กำลังประมูล</Link></li>
                <li><Link to='/user/status/win' >สินค้าที่ได้</Link></li>
                <li><Link to="/user/profile">บัญชีผู้ใช้</Link></li>
            </ul>
        ):(<></>)}
        </>
    );
}

export default Nav;
