import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Head from '../Head';
import './AddProducts.css';

function Add() {
    const navigate = useNavigate();
    const [goodsInfo, setGoodsInfo] = useState({
        picLink: [],
        properties: '',
        time: '',
        price: '',
        leastAdd: '',
        goodName: '',
        date: '',
        selecttime: ''
    });
    const coverRef = useRef(null);
    const otherRefs = useRef([]);
    const maxNumber = 5;

    const handleImgAutChange = (e, index) => {
        const files = Array.from(e.target.files);
        const newPicLink = [...goodsInfo.picLink];
        newPicLink[index] = files[0]; // Store the file object
        setGoodsInfo({ picLink: newPicLink });
    };

    const handleOtherImgChange = (e) => {
        const files = Array.from(e.target.files);
        setGoodsInfo(prevState => ({ picLink: [...prevState.picLink, ...files] })); // Add the file objects
    };

    const clickCancelImg = (picIndex) => {
        setGoodsInfo(prevState => ({
            picLink: prevState.picLink.filter((_, index) => index !== picIndex)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoodsInfo({ ...goodsInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        goodsInfo.picLink.forEach((file) => {
            formData.append('images', file); // Append image files
        });

        formData.append('goodName', goodsInfo.goodName);
        formData.append('properties', goodsInfo.properties);
        formData.append('time', goodsInfo.time);
        formData.append('openPrice', goodsInfo.price);
        formData.append('leastAdd', goodsInfo.leastAdd);
        formData.append('date', goodsInfo.date);
        formData.append('selecttime', goodsInfo.selecttime)

        try {
            const res = await axios.post("http://localhost:3380/admin/home/addproduct", formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success === false) {
                alert(res.data.text);
            } else {
                alert(res.data.text)
                navigate(-1)
            }
        } catch (err) {
            alert("An error occurred while uploading the images. Please try again.");
        }
    };

    const handleClick = () => {
        navigate(-1);
    };

    console.log(goodsInfo)

    return (
        <>
            <Head title="เพิ่มสินค้า" />
            <form onSubmit={handleSubmit}>
                <div className="addgoods-img">
                    <div className="goods-coverimg">
                        <figure>
                            <label>
                                Image Cover
                                {goodsInfo.picLink.length > 0 ? (
                                    <img 
                                        src={URL.createObjectURL(goodsInfo.picLink[0])} 
                                        className="picture pic-0" 
                                        style={{ width: '60vw' }} 
                                    />
                                ) : (
                                    <img src={'/vite.svg'} className="picture pic-0" />
                                )}
                                <input 
                                    name="images" 
                                    type="file" 
                                    ref={coverRef} 
                                    onChange={(e) => handleImgAutChange(e, 0)} 
                                    hidden 
                                />
                            </label>
                        </figure>
                        <figure>
                            <label>
                                Other Images
                                <input 
                                    name="images" 
                                    type="file" 
                                    multiple 
                                    ref={otherRefs} 
                                    onChange={handleOtherImgChange} 
                                />
                            </label>
                        </figure>
                        <div className="picture-addon">
                            {goodsInfo.picLink.slice(1).map((file, picIndex) => (
                                <figure key={picIndex + 1}>
                                    <img src={URL.createObjectURL(file)} style={{ width: '30vw', height: '30vw'}} />
                                    <span onClick={() => clickCancelImg(picIndex + 1)}>Cancel</span>
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='addgoods-text'>
                    <label>ชื่อสินค้า
                        <input type="text" value={goodsInfo.goodName} onChange={handleChange} name="goodName" />
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
                <div className="CancelAndSubmit">
                    <button className="cancel-btn" onClick={handleClick}>ยกเลิก</button>
                    <button className='submit-btn' type="submit" name="submit">เพิ่มสินค้า</button>
                </div>
            </form>
        </>
    );
}

export default Add;
