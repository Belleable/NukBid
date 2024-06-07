import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
import Head from '../Head';
import Nav from './Nav';
import 'react-image-gallery/styles/css/image-gallery.css'
import Pic from '../../images/pic.jpg'
import toast from 'react-hot-toast';
import Alert from '../Alert';
import Timer from '../Timer';

function Details() {
    const [price, setPrice] = useState(0);
    const [socket, setSocket] = useState(null);

    axios.defaults.withCredentials = true;

    const {goodsID} = useParams();
    const [goodsInfo, setGoodsInfo] = useState([]);
    const [picture, setPicture] = useState()
    
    useEffect(() => {
        const fetchGoodsInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3380/detail/${goodsID}`);                
                setPicture(response.data.picture[0])
                setGoodsInfo(response.data.data[0]);
                
                //setFormData({ ...formData, data: response.data.data, picture: response.data.picture });
            } catch (error) {
                console.error('Error fetching goods data:', error);
            }
        };

        fetchGoodsInfo();

        const newSocket = io('http://localhost:3380');
        setSocket(newSocket);
        // Clean up the socket connection on unmount
        return () => {
            newSocket.close();
        };

    }, [goodsInfo.maxPrice]);

    useEffect(() => {
        if (socket) {
            socket.emit('joinProductRoom', goodsID);

            socket.on('newPrice', (price) => {
                setGoodsInfo({maxPrice: price})
                toast.error('ราคามีการเปลี่ยนแปลงแล้ว', {
                    icon: '🛎️',
                    style: {
                        color: '#F4D03F',
                        background: '#FCF3CF',
                        border: '2px solid #F4D03F'
                    }
                })
            });
        }
    }, [socket]);

    const handleChange = (e) => {
        setPrice(e.target.value)
    }

    console.log(goodsInfo)

    const handleSubmit = async (e) => {
        const currentdate = new Date();
        e.preventDefault();

        if (price <= parseInt(goodsInfo.maxPrice)) {
            return toast.error("กรุณาเสนอราคาให้มากกว่าราคาปัจจุบัน")
        } else if ((price - parseInt(goodsInfo.maxPrice) < parseInt(goodsInfo.leastAdd))) {
            return toast.error("กรุณาเสนอราคาเพิ่มอย่างน้อยครั้งละ " + goodsInfo.leastAdd + " บาท")
        }

        const res = await axios.put(`http://localhost:3380/user/products/${goodsID}`, {price: price, datetime_new: new Date(), datetime_old: goodsInfo.endTime})
        if ( res.data.success === true ) {
            toast.success(res.data.text)
            setGoodsInfo({...goodsInfo, maxPrice: price})
              socket.emit('newMessage', { goodsID: goodsID, price: price });
        } else {
              alert(res.data.text)
        }
    };

    const handleClick = (e) => {
        e.preventDefault()
        setPrice(goodsInfo.maxPrice);
    }
    console.log(picture)

    return (
        <>
            <Head title = 'NukBid' />
            {/*<Nav />*/}
            <Alert />
            <main>
                <div className="GoodsInfo" key={goodsInfo._id}>
                    <div className='goods-img'>
                    </div>
                    <div className="text">
                        <h2>{goodsInfo.goodName}</h2>
                        <p>{goodsInfo.properties}</p>
                        <table>
                            <tr>
                                <th>เวลาที่เหลือ</th>
                                <td id="timeleft"><Timer endTime = {goodsInfo.endTime}/></td>
                            </tr>
                            <tr>
                                <th>ผู้เสนอราคาสูงสุด</th>
                                {goodsInfo.topBuyer_username === undefined ? 
                                    <td>
                                        <span> ยังไม่มีผู้ประมูลสินค้าชิ้นนี้ </span>
                                    </td>
                                    :
                                    <td>
                                        {goodsInfo.topBuyer_picture  ?
                                            <img src={`http://localhost:3380/${goodsInfo.topBuyer_picture.data}`} alt="Profile pic"  style={{'width': '200px'}} />
                                            :
                                            <img src={Pic} alt=''/>
                                        }
                                        <span id="topBuyer">{goodsInfo.topBuyer_username}</span>
                                        <span id="maxPrice">{goodsInfo.maxPrice}</span>
                                    </td>
                                }
                            </tr>
                        </table>
                        <form onSubmit={ handleSubmit }>
                            <label> เสนอราคา
                                <input value={price !== 0 ?  price : goodsInfo.maxPrice} onChange={ handleChange } type='number' step={goodsInfo.leastAdd}/>
                            </label>
                            <p>เพิ่มได้ทีละไม่ต่ำกว่า {goodsInfo.leastAdd} บาท</p>
                            <div className='submit-cancel'>
                                <button className='cancel-btn' onClick={handleClick}>ยกเลิก</button>
                                <button type='submit' className='submit-btn'>ตกลง</button>
                            </div>
                        </form>
                    </div>
                </div>
    </main>
    {/*picture.map((pic)=>(
        <img src={`http://localhost:3380/${pic.original}`} alt="" />
    ))*/}
        </>
    )
}

export default Details;