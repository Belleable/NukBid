import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav';
import Card from '../Card';

function Search() {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        axios.get('http://localhost:3009/results').then(res => {
            if (res.data.status === "success") {
                setAuth(true)
                navigate('/login')
            } else {
                setAuth(false)
            }
        })

        const fetchAllResults = async ()=>{
            try{
                const res = await axios.get("http://localhost:3009/home");
                setGoods(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllResults();
    }, []);
    

    console.log(goods);
    console.log(goods.length);


    return (
        <>
        <Nav />
        <div>Search results : {goods.length} รายการ</div> 
        {/* เอาที่ผู้ใช้เสิชไปเขียนบนหน้านึงแล้ว fetch มาดิสเพลย์หน้านี้ */}
        <Card product = {goods}/>
        </>
    );
}

export default Search;