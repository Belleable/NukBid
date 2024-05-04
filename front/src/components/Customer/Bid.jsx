import React, { useState } from 'react';
import Nav from './Nav';
import Card from '../Card';

function Bid() {
    const [auth, setAuth] = useState(false);
    const [goods, setGoods] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        const fetchBidding = async () => {
            try {
                const res = await axios.get('http://localhost:3380/bidding')
                if (res.data.success === true) {
                    setGoods(res.data.data)
                } else {
                    setAuth(false)
                }
            } catch (error) {
                console.log(error.text)
            }
        }
        fetchBidding()
    }, []);

    return (
        <>
        <Nav />
        <h4 className='bid-text'>สินค้าที่ท่านกำลังประมูล</h4>
        <Card goods={goods} isDeletable={true}/>

        </>
    );
}

export default Bid;