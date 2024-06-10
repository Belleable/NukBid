import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Pic from '../../images/Defaultprofile.png';
import Head from '../Head';
import Alert from '../Alert';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './css/EditProfile.css'

function Edit() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        picture: null,
        fname: '',
        lname: '',
        email: '',
        tel: '',
        password: '',
        address: '',
        conf_pw: '',
    });

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        if (e.target.name === 'picture') {
            const reader = new FileReader();
            const file = e.target.files[0];
            const imgName = e.target.files[0].name;
            if (file) {
                reader.readAsDataURL(file);
            }

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxSize = Math.max(img.width, img.height);
                    canvas.width = maxSize;
                    canvas.height = maxSize;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(
                        img,
                        (maxSize - img.width) / 2,
                        (maxSize - img.height) / 2
                    );
                    canvas.toBlob(
                        (blob) => {
                            const file = new File([blob], imgName, {
                                type: 'image/*',
                                lastModified: Date.now(),
                            });

                            setUser({ ...user, picture: file})
                        },
                        "image/jpeg",
                        0.8
                    );
                };
            };
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3380/user/profile`); 
                setUser(prevUser => ({
                    ...prevUser,
                    ...response.data.data[0],
                    password: ''
                }));
                //setUser(response.data.data[0])
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.conf_pw) {
            toast.error('รหัสผ่านไม่ตรงกัน')
            return;
        }

        const formData = new FormData();
        formData.append('fname', user.fname);
        formData.append('lname', user.lname);
        formData.append('email', user.email);
        formData.append('tel', user.tel);
        formData.append('password', user.password);
        formData.append('address', user.address);
        formData.append('picture', user.picture)

        try {
            const resEdit = await axios.put(`http://localhost:3380/user/profile/edit`, formData); 
            if (resEdit.data.success === true) {
                toast.success(resEdit.data.text)
                navigate(`/user/profile`);
            } else {
                toast.error(resEdit.data.text)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = () => {
        navigate(-1)
    }

    const handleImgClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    return (
        <>
            <Head title="แก้ไขโปรไฟล์" />
            <Link to={-1} className='back-btn-bg'>
                <FontAwesomeIcon className='back-btn' icon={faArrowLeft} />
            </Link>

            <main className='EditProfile'>
                <h1>แก้ไขโปรไฟล์</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='file-input' onClick={handleImgClick}>
                        {user.picture  ? 
                            typeof user.picture.data === 'string' ?
                                <img src={`http://localhost:3380/${user.picture.data}`} alt="Profile pic"  style={{'width': '200px'}} />
                                :
                                <img src={URL.createObjectURL(user.picture)} alt=''/>
                            :
                            <img src={Pic} alt=''/>
                        }
                        <input type='file' onChange={handleChange} ref={inputRef} name='picture' />
                    </div>

                    <div className="text-input">
                        <div className='fname'>
                            <label for="fname-box">ชื่อจริง
                            <input id="fname" type="text" value={user.fname} onChange={handleChange} name="fname" />
                            </label>
                        </div>
                        <div className='lname-box'>
                            <label for="lname">นามสกุล
                            <input id="lname" type="text" value={user.lname} onChange={handleChange} name="lname" />
                            </label>
                        </div>
                        <div className='email-box'>
                            <label for="email">อีเมล
                            <input id="email" type="text" value={user.email} onChange={handleChange} name="email" />
                            </label>
                        </div>
                        <div className='tel-box'>
                            <label for="tel">เบอร์โทรศัพท์
                            <input id="tel" type="text" value={user.tel} onChange={handleChange} name="tel" />
                            </label>
                        </div>
                        <div className='address-box'>
                            <label for="address">ที่อยู่สำหรับจัดส่ง
                            <textarea rows={4} cols={40} id="address" type="text" value={user.address} onChange={handleChange} name="address" />
                            </label>
                        </div>
                        <div className='pw-box'>
                            <label for="password">รหัสผ่านใหม่
                            <input id="password" type="password" value={user.password} onChange={handleChange} name="password" />
                            </label>
                        </div>
                        <div className='conf-box'>
                            <label for="conf_pw">ยืนยันรหัสผ่าน
                            <input id="conf_pw" type="password" value={user.conf_pw} onChange={handleChange} name="conf_pw" />
                            </label>
                        </div>      
                    </div>

                    <div class="CancelAndSubmit">
                        <button className='cancel-btn' type='reset' onClick={handleClick}>ยกเลิก</button>
                        <button className='submit-btn' type="submit" name="submit">ยืนยัน</button>
                    </div>
                </form>
            </main>
        </>
    )

}

export default Edit;