import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Card from '../Card';
import Head from '../Head';

function Search() {
    const [auth, setAuth] = useState(false);
    const [results, setResults] = useState([]);

    const [ searchParams ] = useSearchParams()
    const keyword = searchParams.get('keyword')

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetchAllResults = async () => {
            try {
                const res = await axios.get(`http://localhost:3380/user/results?keyword=${keyword}`)
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
        <Head title="ผลการค้นหา"/>
        <Nav />
        <p>ผลหารค้นหาสำหรับ "{keyword}" : {results.length} รายการ</p> 
        {results.length == 0 ? (<div className='no-match'>ขออภัย ไม่มีสินค้าที่ตรงกับคำค้นหาของคุณ</div>):(<Card goods = {results}/>)}
        </>
    );
}

export default Search;