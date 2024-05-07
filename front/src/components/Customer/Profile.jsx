import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Head from '../Head';
import Pic from '../../images/pic.jpg';

function Profile() {
    const [profile, setProfile] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3380/user/profile");
                setProfile(res.data.data);
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
    
    return (
        <>
            {profile.map(user => (
                <div className="profile-container" key={user.id}>
                    <Head title={user.username} />
                    <Link to='/user/home' className='back-btn'>ย้อนกลับ</Link>
                    <h1>โปรไฟล์</h1>
                    {user.profile ? (<img src={`data:image/jpeg;base64, ${Buffer.from(user.picture.data).toString('base64')}`} alt="User Pfp" />):(<img src={Pic} alt="User Pfp" />)}
                    <img src={user.picture ? `data:image/jpeg;base64,${user.picture.data.toString('base64')}` : 'default_image_url'} alt="User Pfp" />

                    
                    <h2>{user.username}</h2>
                    <h2>{user.username}</h2>
                    <h3>{user.fname} {user.lname}</h3>
                    <div className='user-contact'>
                        <div className='tel-email'>
                            <label>อีเมล
                                <p>{user.email}</p>
                            </label>
                            <label>เบอร์โทรศัพท์
                                <p>{user.tel}</p>
                            </label>
                        </div>
                        <div className='address'>
                            <label>ที่อยู่สำหรับจัดส่ง
                                <p>{user.address}</p>
                            </label>
                        </div>
                    </div>
                    <div className='button'>
                        <Link to='/login' className="logout-btn" role="button" onClick={handleLogout}>ออกจากระบบ</Link>
                        <Link to='/user/profile/edit' className="edit-btn" role="button">แก้ไขโปรไฟล์</Link>
                    </div>
                        
                </div>

                ))}
        </>
    )
}

export default Profile;