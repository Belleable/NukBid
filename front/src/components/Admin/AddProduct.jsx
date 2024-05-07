/*import React, { useEffect, useState, useRef } from 'react';
import AdminNav from './AdminNav';
import Head from '../Head';
import axios from 'axios';
import { Link, useNavigate, useParams, useRef } from "react-router-dom";

function Add() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const {goodsID} = useParams();
    const [goodsInfo, setGoodsInfo] = useState({
        picLink: [],
        goodsName: '',
        properties: '',
        time: '',
        price: '',
        leastAdd: '',
    });
    return (
        <>
        <Head title="เพิ่มสินค้า" />
        <AdminNav />
        <div>Add</div>
        </>
    );
}

export default Add;*/