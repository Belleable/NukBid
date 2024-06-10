import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Head from '../Head';
import Alert from '../Alert';
import toast from 'react-hot-toast';
import RegisTmg from '../../images/regisimg2.jpg';
import './css/Register.css';

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
    const [alert, setAlert] = useState('');
    const pwMatch = formData.password === formData.conf_pw

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pwMatch) {
            toast.error('กรุณาใส่รหัสผ่านให้ตรงกัน')
            return;
        }

        try {

            const response = await axios.post('http://localhost:3380/register', formData)

            if(response.data.success === false){
                toast.error(response.data.text)
                setAlert(response.data.error)
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
        // setFormData({
        //     fname: '',
        //     lname: '',
        //     username: '',
        //     email: '',
        //     phone: '',
        //     pw: '',
        //     conf_pw: '',
        //     address: '',
        // });
    };
    console.log(pwMatch);
    return (
        <div className="Register">
            <Head title="สมัครใช้งาน NukBid"/>
            <Alert />
            <main>
                <h3>ลงทะเบียน</h3>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="user-details">
                        <label>ชื่อ
                            <input 
                            type="text" 
                            placeholder="ชื่อ" 
                            name="fname" 
                            value={formData.fname}
                            onChange={handleChange}
                            required/>
                        </label>
                        <label>นามสกุล
                            <input 
                            type="text" 
                            placeholder="นามสกุล" 
                            name="lname" 
                            value={formData.lname}
                            onChange={handleChange}
                            required/>
                        </label>
                        <label  onClick={() => {setAlert('')}}>Username
                            <input 
                            type="text" 
                            placeholder="ชื่อผู้ใช้" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}
                            required/>
                            <span style={alert === 'account' ? {'color': 'red', 'font-size': '14px'} : {'display': 'none'}}>บัญชีนี้มีผู้ใช้งานแล้ว</span>
                        </label>
                    <label>อีเมล
                        <input 
                        type="text" 
                        placeholder="อีเมล" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>เบอร์โทรศัพท์
                        <input 
                        type="text" 
                        placeholder="เบอร์โทรศัพท์" 
                        name="tel" 
                        value={formData.tel}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>ที่อยู่
                        <input 
                        type="text" 
                        placeholder="ที่อยู่สำหรับจัดส่ง" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange} 
                        required/>
                    </label>
                    <label>รหัสผ่าน
                        <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>ยืนยันรหัสผ่าน
                        <input 
                        type="password" 
                        placeholder="ยืนยันรหัสผ่าน" 
                        name="conf_pw"
                        value={formData.conf_pw}
                        onChange={handleChange} 
                        required/>
                        <span style={!pwMatch ? {'color': 'red', 'font-size': '14px'} : {'display': 'none'}}>รหัสผ่านไม่ตรงกัน</span>
                    </label>
                    
                </div>
                <input type="submit" value="ลงทะเบียน"/>
            </form>
            <img src={RegisTmg} />
            </main>
        </div >
    )
}

export default Register;