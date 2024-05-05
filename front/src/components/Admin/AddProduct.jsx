import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import Head from '../Head';

function Add() {
    return (
        <>
        <Head title="เพิ่มสินค้า" />
        <AdminNav />
        <div>Add</div>
        </>
    );
}

export default Add;