import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Head';
import Alert from '../Alert';
import toast from 'react-hot-toast';
import loginImg from '../../images/login-img.jpg'
import './css/Login.css'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [alert, setAlert] = useState('');

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3380/login', {
                username: formData.username,
                password: formData.password,
            });
            if (response.data.success === true) {
                toast.success(response.data.text)
                if (response.data.isAdmin){
                    navigate('/admin/home')
                } else {navigate('/user/home');}
            }
            else {
                setAlert(response.data.error)
                toast.error('กรุณากรอกข้อมูลใหม่')
                console.log('Login failed. Error:', response.data.text);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            toast.error(response.data.text)
        }
    };
    
    return (
        <div className='Login'>
            <Head title="เข้าสู่ระบบ NukBid"/>
            <Alert/>
        <body className="container">
            <img src={loginImg} />
            <form action="/login" method="post" onSubmit={handleSubmit}>
                <h1>ลงชื่อเข้าใช้</h1>
                <label htmlFor="username" onClick={() => {setAlert('')}}>ชื่อบัญชี
                    <input 
                    type="text" 
                    required="" 
                    id="username" 
                    name="username" 
                    value={formData.username}
                    onChange={handleChange}
                    />
                    <span style={alert === 'account' ? {'color': 'red', 'font-size': '14px'} : {'display': 'none'}}>ไม่พบบัญชีผู้ใช้นี้</span>
                </label>
                <label htmlFor="pw" onClick={() => {setAlert('')}}>รหัสผ่าน
                    <input 
                    type="password" 
                    required="" 
                    id="pw" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange} />
                    <span style={alert === 'password' ? {'color': 'red', 'font-size': '14px'} : {'display': 'none'}}>รหัสผ่านไม่ถูกต้อง</span>
                </label>        
                    <input className='login-btn' type="submit" value="Log in"/>
                    <span>ยังไม่มีบัญชีใช่มั้ย? <Link to='/register'>ลงทะเยีบน</Link></span>
                </form>
            </body>
        </div>
    )
}

export default Login;