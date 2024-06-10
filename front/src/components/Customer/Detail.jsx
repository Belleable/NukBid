import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Head from '../Head';
import Nav from './Nav';
import AdminNav from '../Admin/AdminNav';
import 'react-image-gallery/styles/css/image-gallery.css'
import Pic from '../../images/pic.jpg'
import toast from 'react-hot-toast';
import Alert from '../Alert';
import Timer from '../Timer';
import './css/Detail.css'

function Details() {
    const [price, setPrice] = useState(0);
    const [socket, setSocket] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const {goodsID} = useParams();
    const [goodsInfo, setGoodsInfo] = useState([]);
    const [picture, setPicture] = useState([])
    const [currentImg, setCurrentImg] = useState(0);
    const [newEndTime, setNewEndTime] = useState(null)

    const canBid = location.pathname.split('/')[1] === 'user';
    const checkTimeOver = new Date(goodsInfo.endTime) <= new Date();
    
    useEffect(() => {
        const fetchGoodsInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3380/detail/${goodsID}`);                
                setPicture(response.data.picture[0])
                setGoodsInfo(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching goods data:', error);
            }
        };

        fetchGoodsInfo();

        const newSocket = io('http://localhost:3380');
        setSocket(newSocket);
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

    const handleRestock = (e) => {
        e.preventDefault()
        setNewEndTime(0)
    }
    const handleSubmitRestock = async (e) => {
        e.preventDefault()
        const restock = await axios.put(`http://localhost:3380/restock/${goodsID}`, {new_time: newEndTime})
        if (restock.data.success === true) {
            toast.success(restock.data.text)
            navigate('/admin/home')
        } else {
            toast.error(restock.data.text)
        }
    }
    console.log(checkTimeOver);
    return (
        <>
            <Head title = 'NukBid' />
            {canBid ?
                <Nav />
                :
                <AdminNav />
            }
            <Alert />
            <>.</>
            <main>
                <div className="GoodsInfo" key={goodsInfo._id}>
                    <div className='goods-img'>
                        <img 
                            src={picture[currentImg]?.original}
                            alt='product img' 
                        />
                        {picture[0]?.original &&
                            <img 
                                src={picture[0]?.original}
                                alt='product img' 
                                onMouseOver={(e) => (setCurrentImg(0))}
                            />
                        }
                        {picture[1]?.original &&
                            <img 
                                src={picture[1]?.original}
                                alt='product img' 
                                onMouseOver={(e) => (setCurrentImg(1))}
                            />
                        }
                        {picture[2]?.original &&
                            <img 
                                src={picture[2]?.original}
                                alt='product img' 
                                onMouseOver={(e) => (setCurrentImg(2))}
                            />
                        }
                        {picture[3]?.original &&
                            <img 
                                src={picture[3]?.original}
                                alt='product img' 
                                onMouseOver={(e) => (setCurrentImg(3))}
                            />
                        }
                        {picture[4]?.original &&
                            <img 
                                src={picture[4]?.original}
                                alt='product img' 
                                onMouseOver={(e) => (setCurrentImg(4))}
                            />
                        }
                    </div>
                    <div className="text">
                        <h2>{goodsInfo.goodName}</h2>
                        <p>{goodsInfo.properties}</p>
                        {/* <table>
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
                        </table> */}
                        <div>
                            <div className='time-row'>
                                <span>เวลาที่เหลือ</span>
                                <div id="timeleft"><Timer endTime = {goodsInfo.endTime}/></div>
                            </div>
                            <div className='top-row'>
                                <span>ผู้เสนอราคาสูงสุด</span>
                                {goodsInfo.topBuyer_username === null || goodsInfo.topBuyer_username === undefined ? 
                                    <div>
                                        <div id="topBuyer">ยังไม่มีผู้ประมูลสินค้าชิ้นนี้</div>
                                        <div id="maxPrice">{goodsInfo.maxPrice} THB</div>
                                    </div>
                                    :
                                    <div>
                                        <div id="topBuyer" onClick={() => (navigate(`userprofile/${goodsInfo.topBuyer_username}`))}>
                                            {goodsInfo.topBuyer_picture  ?
                                                
                                                    <img src={`http://localhost:3380/${goodsInfo.topBuyer_picture.data}`} alt="Profile pic"  style={{'width': '200px'}} />
                                                
                                                :
                                                <img src={Pic} alt=''/>
                                            }
                                            <div>{goodsInfo.topBuyer_username}</div>
                                        </div>
                                        <div id="maxPrice">{goodsInfo.maxPrice} THB</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='price-label'>เสนอราคา</div>
                        <form onSubmit={ handleSubmit }>
                            {/* <label> เสนอราคา */}
                                <input value={price !== 0 ?  price : goodsInfo.maxPrice} onChange={ handleChange } type='number' step={goodsInfo.leastAdd}/>
                            {/* </label> */}
                            <p>เพิ่มได้ทีละไม่ต่ำกว่า {goodsInfo.leastAdd} บาท</p>
                            {canBid && (checkTimeOver !== true) ?
                                (<div className='submit-cancel'>
                                    <button className='cancel-btn' type='reset' onClick={handleClick}>ยกเลิก</button>
                                    <button type='submit' className='submit-btn'>ตกลง</button>
                                </div>)
                                :
                                (checkTimeOver && newEndTime === null ?
                                    ((!canBid && checkTimeOver === true) &&
                                        <div className='submit-cancel'>
                                            <button type='restock' className='submit-btn' onClick={handleRestock}>เปิดประมูลอีกครั้ง</button>
                                        </div>
                                    )
                                    :
                                    (!canBid && checkTimeOver === true) &&

                                    ( newEndTime !== null &&
                                        <div>
                                            <label>
                                                <span>เวลาปิดประมูลใหม่</span>
                                                <input type='datetime-local' value={newEndTime} onChange={(e) => {setNewEndTime(e.target.value)}} name="newEndTime" />
                                            </label>
                                            <div className='submit-cancel'>
                                                <button type='submit' className='submit-btn' onClick={handleSubmitRestock}>ยืนยันการเปิดประมูลใหม่</button>
                                            </div>
                                        </div>
                                    ))
                            }
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