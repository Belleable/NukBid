import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Head from '../Head';
import Alert from '../Alert';
import toast from 'react-hot-toast';

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        tel: '',
        password: '',
        conf_pw: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.conf_pw) {
            toast.error('กรุณาใส่รหัสผ่านให้ตรงกัน')
            return;
        }

        try {

            const response = await axios.post('http://localhost:3380/register', formData)

            if(response.data.success === false){
                toast.error(response.data.text)
            }
            else{
                toast.success(response.data.text)
                navigate('/login')
            }
            
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('การลงทะเบียนผิดพลาด')
        }

        // Reset the form after submission
        setFormData({
            fname: '',
            lname: '',
            username: '',
            email: '',
            phone: '',
            pw: '',
            conf_pw: '',
            address: '',
        });
    };

    return (
        <div className="Register container">
            <Head title="สมัครใช้งาน NukBid"/>
            <Alert />
            <h3>Registration</h3>
            <form action="#" onSubmit={handleSubmit}>
                <div className="user-details">
                    <label>First Name
                        <input 
                        type="text" 
                        placeholder="ชื่อ" 
                        name="fname" 
                        value={formData.fname}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Last Name
                        <input 
                        type="text" 
                        placeholder="นามสกุล" 
                        name="lname" 
                        value={formData.lname}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Username
                        <input 
                        type="text" 
                        placeholder="ชื่อผู้ใช้" 
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Email
                        <input 
                        type="text" 
                        placeholder="อีเมล" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Phone Number
                        <input 
                        type="text" 
                        placeholder="เบอร์โทรศัพท์" 
                        name="tel" 
                        value={formData.tel}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Password
                        <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Confirm Password
                        <input 
                        type="password" 
                        placeholder="ยืนยันรหัสผ่าน" 
                        name="conf_pw"
                        value={formData.conf_pw}
                        onChange={handleChange} 
                        required/>
                    </label>
                    <label>Address
                        <input 
                        type="text" 
                        placeholder="ที่อยู่สำหรับจัดส่ง" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange} 
                        required/>
                    </label>
                </div>
                <input type="submit" value="Register"/>
            </form>
        </div >
    )
}

export default Register;