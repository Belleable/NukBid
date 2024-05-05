import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Pic from '../../images/pic.jpg';

function Edit() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        pfp: '',
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
        if (e.target.name === 'pfp') {
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
                                type: 'image/png',
                                lastModified: Date.now(),
                            });

                            setUser({ ...user, pfp: file})
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
                const response = await axios.get(`http://localhost:3380/userprofile`); 
                setUser(response.data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.conf_pw) {
            alert('Password and confirm password do not match. Please try again.');
            return;
        }

        try {
            const resEdit = await axios.put(`http://localhost:3009/userprofile/edit`, user); 
            if (resEdit.data.status === "success") {
                alert(resEdit.data.success);
                navigate(`/userprofile`);
            } else {
                alert(resEdit.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = () => {
        navigate("/userprofile")
    }

    const handleImgClick = () => {
        inputRef.current.click();
    }

    return (
        <>
            <Link to='/userprofile' className='back-btn'>ย้อนกลับ</Link>

            <main>

                <form action="" onSubmit={handleSubmit}>
                    <div className='file-input' onClick={handleImgClick}>
                        {user.pfp ? (<img src={URL.createObjectURL(user.pfp)} alt=''/>):(<img src={Pic} alt=''/>)}
                        <input type='file' onChange={handleChange} ref={inputRef} name='pfp' />
                    </div>

                    <div className="text-input">
                        <div className='left-input'>
                            <label for="fname">ชื่อจริง
                                <input id="fname" type="text" value={user.fname} onChange={handleChange} name="fname" />
                            </label>
                            <label for="email">อีเมล
                                <input id="email" type="text" value={user.email} onChange={handleChange} name="email" />
                            </label>
                            <label for="tel">เบอร์โทรศัพท์
                                <input id="tel" type="text" value={user.tel} onChange={handleChange} name="tel" />
                            </label>
                            <label for="password">รหัสผ่านใหม่
                                <input id="password" type="text" value={user.password} onChange={handleChange} name="password" />
                            </label>
                        </div>
                        <div className='right-input'>
                            <label for="lname">นามสกุล
                                <input id="lname" type="text" value={user.lname} onChange={handleChange} name="lname" />
                            </label>
                            <label for="address">ที่อยู่สำหรับจัดส่ง
                                <input id="address" type="text" value={user.address} onChange={handleChange} name="address" />
                            </label>
                            <label for="conf_pw">ยืนยันรหัสผ่าน
                                <input id="conf_pw" type="text" value={user.conf_pw} onChange={handleChange} name="conf_pw" />
                            </label>
                        </div>        
                    </div>

                    <div class="CancelAndSubmit">
                        <button id="cancel" class="button" onClick={handleClick}>ยกเลิก</button>
                        <button id="submit" class="button" type="submit" name="submit">ยืนยัน</button>
                    </div>

                    </form>

                </main>
        </>
    )

}

export default Edit;