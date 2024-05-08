import React, { useEffect, useState, useRef } from 'react';
import AdminNav from './AdminNav';
import Head from '../Head';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ImageUploading from 'react-images-uploading';


function Add() {
    const navigate = useNavigate();
    const [goodsInfo, setGoodsInfo] = useState({
        picLink: [],
        goodsName: '',
        properties: '',
        time: '',
        price: '',
        leastAdd: '',
    });
    const maxNumber = 5;

    const handleImgChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setGoodsInfo({ ...goodsInfo, picLink: imageList});
  };

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        const { name , value } = e.target;
        setGoodsInfo({ ...goodsInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            picLink: goodsInfo.picLink,
            goodsName: goodsInfo.goodsName,
            properties: goodsInfo.properties,
            time: goodsInfo.time,
            price: goodsInfo.price,
            leastAdd: goodsInfo.leastAdd,
        };
        console.log(data)
        
        try{
            const res = await axios.post("http://localhost:3380/addproduct", data, {
                withCredentials: true,
            })
            if(res.data.status === "error") {
                alert(res.data.error)
            } else {
                alert(res.data.success)
                navigate('/admin')
            }
        }
        catch(err){alert("Please use another pic")}
    }

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <>
        <Head title="เพิ่มสินค้า" />
        <AdminNav />
        <form onSubmit={handleSubmit}>
            <div className='addgoods-img'>
                <ImageUploading
                multiple
                value={goodsInfo.picLink}
                onChange={handleImgChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                >
                {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (
          // write your building UI
                <div className="upload__image-wrapper">
                    <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    >   
                    คลิกเพื่อเพิ่มภาพสินค้าไม่เกิน 5 ภาพ
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll}>Remove all images</button>
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>)}
                </ImageUploading>
            </div>
            <div className='addgoods-text'>
                <label>ชื่อสินค้า
                    <input type="text" value={goodsInfo.goodsName} onChange={handleChange} name="goodsName" />
                </label>
                <label>ราคาเปิด
                    <input type='text' value={goodsInfo.price} onChange={handleChange} name="price" />
                </label>
                <label>วัน-เวลาปิดประมูล
                    <input type='datetime-local' value={goodsInfo.time} onChange={handleChange} name="time" />
                </label>
                <label>bid ขั้นต่ำ
                    <input type='text' value={goodsInfo.leastAdd} onChange={handleChange} name="leastAdd" />
                </label>
                <label>รายละเอียดเพิ่มเติม
                    <textarea rows={10} cols={80} type='text' value={goodsInfo.properties} onChange={handleChange} name="properties" />
                </label>
            </div>
            <div class="CancelAndSubmit">
                <button className="cancel-btn" onClick={handleClick}>ยกเลิก</button>
                <button className='submit-btn' type="submit" name="submit">เพิ่มสินค้า</button>
            </div>
        </form>

        

        </>
    );
}

export default Add;