import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Head from '../Head';
import Pic from '../../images/pic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../Customer/css/UserProf.css'

function WinnerProfile() {
    const [profile, setProfile] = useState([]);
    const {username} = useParams();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:3380/winner/profile/${username}`);
                setProfile(res.data.data[0]);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    }, []);
    console.log(username);
    return (
        <>
            <div className="profile-container" key={profile._id}>
                <Head title="หมาโร่"/>
                
                <Link to={-1} className='back-btn-bg'>
                    <FontAwesomeIcon className='back-btn' icon={faArrowLeft} />
                </Link>
                <h1>โปรไฟล์</h1>
                { profile.picture ? 
                    (<img src={`http://localhost:3380/${profile.picture.data}`} />)
                    :
                    (<img src={Pic} alt="User Pfp" />)
                }
                <h2>{profile.username}</h2>
                <h3>{profile.fname} {profile.lname}</h3>
                <div className='user-contact'>
                    <div className='tel-email'>
                        <div className='email'>อีเมล
                            <p>{profile.email}</p>
                        </div>
                        <div className='phone'>เบอร์โทรศัพท์
                            <p>{profile.tel}</p>
                        </div>
                    </div>
                    <div className='address'>
                        <label>ที่อยู่สำหรับจัดส่ง
                            <p>{profile.address}</p>
                        </label>
                    </div>
                </div>   
            </div>
        </>
    )
}

export default WinnerProfile;