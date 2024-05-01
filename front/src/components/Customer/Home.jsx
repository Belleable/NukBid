import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav';
import Card from '../Card';

function Home() {
    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;


    useEffect(()=>{
        
        axios.get('http://localhost:3009/').then(res => {
            if (res.data.status === "success") {
                setAuth(true)
                navigate('/login')
            } else {
                setAuth(false)
            }
        })

        const fetchAllPets = async ()=>{
            try{
                const res = await axios.get("http://localhost:3009/home");
                setGoods(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllPets();
    }, []);
    

    console.log(goods)
    return (
        <>
        <Nav />
        <Card product = {goods}/>
        </>
    );
}

export default Home;