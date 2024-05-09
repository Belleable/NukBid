import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Head from '../Head';
import Pic from '../../images/pic.jpg';

function UserProf() {
    const [profile, setProfile] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3380/user/profile");
                setProfile(res.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        axios.get('http://localhost:3380/logout')
        .then(res => {
            window.location.reload(true);
        })
    }
    console.log(profile)

    return (
        <>
            <div className="profile-container" key={profile.id}>
                <Head title={profile.username} />
                <Link to='/user/home' className='back-btn'>ย้อนกลับ</Link>
                <h1>โปรไฟล์</h1>
                {profile.pfp ? (<img src={profile.pfp} alt="User Pfp" />):(<img src={Pic} alt="User Pfp" />)}
                <h2>{profile.username}</h2>
                <h3>{profile.fname} {profile.lname}</h3>
                <div className='user-contact'>
                    <div className='tel-email'>
                        <label>อีเมล
                            <p>{profile.email}</p>
                        </label>
                        <label>เบอร์โทรศัพท์
                            <p>{profile.tel}</p>
                        </label>
                    </div>
                    <div className='address'>
                        <label>ที่อยู่สำหรับจัดส่ง
                            <p>{profile.address}</p>
                        </label>
                    </div>
                </div>
                <div className='button'>
                    <Link to='/login' className="logout-btn" role="button" onClick={handleLogout}>ออกจากระบบ</Link>
                    <Link to='/user/profile/edit' className="edit-btn" role="button">แก้ไขโปรไฟล์</Link>
                </div>    
            </div>
        </>
    )
}

export default UserProf;