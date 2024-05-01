import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        phone: '',
        pw: '',
        conf_pw: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.pw !== formData.conf_pw) {
            alert('Password and confirm password do not match. Please try again.');
            return;
        }

        try {

            // Send the registration data to your server
            const response = await axios.post('http://localhost:3009/register', formData)

            // Handle the response accordingly
            if(response.data.status === "error"){
                alert(response.data.error)
            }
            else{
                alert(response.data.success)
                navigate('/login')
            }
            
        } catch (error) {
            // Handle registration error
            console.error('Registration error:', error);

            // Show an alert or update the UI with an error message
            alert('Registration failed. Please try again.');
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

    console.log(formData);

    return (
        <div className="Register container">
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
                        placeholder="อีเมลล์" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Phone Number
                        <input 
                        type="text" 
                        placeholder="เบอร์โทรศัพท์" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required/>
                    </label>
                    <label>Password
                        <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        name="pw" 
                        value={formData.pw}
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
                        name="conf_pw"
                        value={formData.conf_pw}
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