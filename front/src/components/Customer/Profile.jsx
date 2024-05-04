import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

function Profile() {
    const [profile, setProfile] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3380/userprofile");
                setProfile(res.data);
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
                    <h1>โปรไฟล์</h1>
                    <img src={user.pfp} alt="User Pfp" />
                    <h2>{user.username}</h2>
                    <h3>{user.fname} {user.lname}</h3>
                    <div className='user-contact'>
                        <div className='tel-email'>
                            <label>อีเมลล์
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
                        <Link to='/userprofile/edit' className="edit-btn" role="button">แก้ไขโปรไฟล์</Link>
                    </div>
                        
                </div>

                ))}
        </>
    )
}

export default Profile;