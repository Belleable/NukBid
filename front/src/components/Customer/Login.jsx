import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Head';
import Alert from '../Alert';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

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
                toast.error(response.data.text)
                console.log('Login failed. Error:', response.data.text);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            toast.error(response.data.text)
        }
    };
    
    return (
        <div className="Login">
            <Head title="เข้าสู่ระบบ NukBid"/>
            <Alert />
            <h1>Log in</h1>
            <form action="/login" method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username
                    <input 
                    type="text" 
                    required="" 
                    id="username" 
                    name="username" 
                    value={formData.username}
                    onChange={handleChange}
                    />
                </label>
                <label htmlFor="pw">Password
                    <input 
                    type="password" 
                    required="" 
                    id="pw" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange} />
                </label>
                            
                <input className='login-btn' type="submit" value="Log in"/>
                <span>Don't have an account yet? <Link to='/register'>Sign up</Link></span>
                    
            </form>
        </div>
    )
}

export default Login;