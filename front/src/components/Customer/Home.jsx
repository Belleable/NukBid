import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav';
import Card from '../Card';

function Home() {
    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([{goodsID: 1, goodsName: 'hello'}]);

    //axios.defaults.withCredentials = true;


    /*useEffect(()=>{
        
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:3380/user/home')
                if (res.data.success === true) {
                    console.log(res.data)

                    setGoods(res.data)
                } else {
                    setAuth(false)
                }
            } catch (error) {
                console.log(error.text)
            }
        }
        fetch()
    }, []);*/
    

    //console.log(goods)
    return (
        <>
        
            
                    <Card goods={goods} />

            
            
        </>
    );
}

export default Home;