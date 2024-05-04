import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

// มาใส่ซอกเก้ตหน้านี้

function Details() {
    const navigate = useNavigate();

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
    }, []);
    console.log(goodsInfo)

    return (
        <>
            <header>
                <h1>รายละเอียดสินค้า</h1>
            </header>
            <main>
                <div className="GoodsInfo" key={goodsInfo.goodsID}>
                    {/* {pets.petID && <img src={pets.petPfpUrl} />} */}
                        <div class="text">
                            <h2>{goodsInfo.goodsName}</h2>
                            <div>{goodsInfo.properties}</div>
                            <table>
                                <tr>
                                    <th>เวลาที่เหลือ</th>
                                    <td id="timeleft">{goodsInfo.time}</td>
                                </tr>
                                <tr>
                                    <th>ผู้เสนอราคาสูงสุด</th>
                                    <td>
                                        <span id="topBuyer">{goodsInfo.topBuyer}</span>
                                        <span id="maxPrice">{goodsInfo.maxPrice}</span>
                                    </td>
                                </tr>
                            </table>
                            <form>
                                <label> เสนอราคา
                                    <input />
                                </label>
                                <div>เพิ่มได้ทีละไม่ต่ำกว่า {goodsInfo.leastAdd} บาท</div>
                                <div className='submit-cancel'>
                                    <button type='submit' className='submit-btn'>ตกลง</button>
                                    {/* มีให้ยืนยันเป็นป็อปอัพก่อนจะอัพเดต */}
                                    <button className='cancel-btn'>ยกเลิก</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </main>
        </>
    )
}

export default Details;