import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav';
import Card from '../Card';

function Search() {
    const [auth, setAuth] = useState(false);
    const [results, setResults] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetchAllResults = async () => {
            try {
                const res = await axios.get('http://localhost:3380/user/results')
                if (res.data.success === true) {
                    setResults(res.data.data)
                } else {
                    setAuth(false)
                }
            } catch (error) {
                console.log(error.text)
            }
        }
        fetchAllResults()
    }, []);

    return (
        <>
        <Nav />
        <p>Search results : {results.length} รายการ</p> 
        {results.length == 0 ? (<div className='no-match'>ขออภัย ไม่มีสินค้าที่ตรงกับคำค้นหาของคุณ</div>):(<Card goods = {results}/>)}
        </>
    );
}

export default Search;