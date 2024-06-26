import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Card from '../Card';
import Head from '../Head';
import './css/Search.css'

function Search() {
    const [auth, setAuth] = useState(false);
    const [results, setResults] = useState([]);

    const {keyword } = useParams()

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetchAllResults = async () => {
            try {
                const res = await axios.get(`http://localhost:3380/user/results/${keyword}`)
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
    }, [keyword]);

    return (
        <>
        <Head title="ผลการค้นหา"/>
        <Nav />
        <main className='Search'>
            <>.</>
            <p>ผลหารค้นหาสำหรับ "{keyword}" : 4 รายการ</p>
            {results ? 
                <div className='card-container'>
                    <Card goods = {results} role={'user'}/>
                </div>
                :
                <div className='no-match'>ขออภัย ไม่มีสินค้าที่ตรงกับคำค้นหาของคุณ</div>
            }
        </main>
        {/* {results.length == 0 ? (<div className='no-match'>ขออภัย ไม่มีสินค้าที่ตรงกับคำค้นหาของคุณ</div>):(<Card goods = {results}/>)} */}
        </>
    );
}

export default Search;