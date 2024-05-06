import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const [price, setPrice] = useState('');
    const [socket, setSocket] = useState(null);
    const { id } = useParams();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const newSocket = io('http://localhost:3380');
        setSocket(newSocket);
        // Clean up the socket connection on unmount
        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('joinProductRoom', id);

            socket.on('newMessageNotification', (message) => {
                  setPrice(message.price)
              });
        }
    }, [socket]);

      const handleNewMessage = async (e) => {
            e.preventDefault();
            const res = await axios.put('http://localhost:3380/user/products/:goodsid', price)
            if ( res.data.success === true ) {
                  socket.emit('newMessage', { message: "Price has Already change", id: id, price: price });
            } else {
                  alert(res.data.text)
            }
      };

      const handleChange = (e) => {
            setPrice(e.target.value)
      }

      console.log("socket:  " + socket)
      return (
            <div>
                  <div>
                        <p>Price: {price}</p>
                        <input 
                              value={price}
                              onChange={handleChange}
                        />
                        <button onClick={handleNewMessage}>Send Message</button>
                  </div>
            </div>
      );
};

export default ProductDetails;
