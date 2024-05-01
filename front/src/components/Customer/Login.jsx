import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login() {
const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        pw: '',
    });

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3009/login', {
                username: formData.username,
                pw: formData.pw,
            });
            if (response.data.status === "success") {
                alert(response.data.success);
                navigate('/home');
            }
            else {
                console.log('Login failed. Error:', response.data.error);
                alert('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Authentication failed. Please try again.');
        }
        setFormData({ username: '', pw: '' });
    };
    return (
        <div className="Login">
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
                    name="pw" 
                    value={formData.pw}
                    onChange={handleChange} />
                </label>
                            
                <input className='login-btn' type="submit" value="Log in"/>
                <span>Don't have an account yet? <Link to='/register'>Sign up</Link></span>
                    
            </form>
        </div>
    )
}

export default Login;