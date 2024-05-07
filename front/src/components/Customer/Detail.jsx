import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
import Head from '../Head';
import Nav from './Nav';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css'


function Details() {
    const [price, setPrice] = useState('');
    const [socket, setSocket] = useState(null);

    axios.defaults.withCredentials = true;

    const {goodsID} = useParams();
    const [goodsInfo, setGoodsInfo] = useState([]);
    
    useEffect(() => {
        const fetchGoodsInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3380/detail/${goodsID}`);
                
                setGoodsInfo(response.data[0]);
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

    }, []);
    console.log(goodsInfo)

    useEffect(() => {
        if (socket) {
            socket.emit('joinProductRoom', goodsID);

            socket.on('newMessageNotification', (message) => {
                  setPrice(message.price)
              });
        }
    }, [socket]);

    const handleChange = (e) => {
        setPrice(e.target.value)
    }

    console.log("socket:  " + socket)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.put('http://localhost:3380/user/products/:goodsid', price)
        if ( res.data.success === true ) {
              socket.emit('newMessage', { message: "Price has Already change", goodsID: goodsID, price: price });
        } else {
              alert(res.data.text)
        }
    };

    const handleClick = (e) => {
        setPrice('');
    }

    return (
        <>
            <Head title = {goodsInfo.goodsName} />
            <Nav />
            <main>
                <div className="GoodsInfo" key={goodsInfo.goodsID}>
                    <div className='goods-img'>
                        <ImageGallery items={goodsInfo.picLink} 
                            showPlayButton = {false}
                            showFullscreenButton = {true}
                            showIndex = {true} />
                    </div>
                    <div className="text">
                        <h2>{goodsInfo.goodsName}</h2>
                        <p>{goodsInfo.properties}</p>
                        <table>
                            <tr>
                                <th>เวลาที่เหลือ</th>
                                <td id="timeleft">{goodsInfo.time}</td>
                            </tr>
                            <tr>
                                <th>ผู้เสนอราคาสูงสุด</th>
                                <td>
                                    <span id="topBuyer">{goodsInfo.topBuyer}</span>
                                    <span id="maxPrice">{price}</span>
                                </td>
                            </tr>
                        </table>
                        <form onSubmit={ handleSubmit }>
                            <label> เสนอราคา
                                <input value={price} onChange={ handleChange } />
                            </label>
                            <p>เพิ่มได้ทีละไม่ต่ำกว่า {goodsInfo.leastAdd} บาท</p>
                            <div className='submit-cancel'>
                                <button type='submit' className='submit-btn'>ตกลง</button>
                                <button className='cancel-btn' onClick={handleClick}>ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Details;