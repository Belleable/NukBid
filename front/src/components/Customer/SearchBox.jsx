import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SearchBox() {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('');
    const [goodName, setGoodName] = useState([])

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchGoodName = async () => {
            try {
                const res = await axios.post('http://localhost:3380/findGoodName', {keyword: keyword})
                if (res.data.success === true) {
                    setGoodName(res.data.data)
                }
            } catch (error) {
                
            }
        }

        if (keyword) {
            fetchGoodName();
        } else {
            setGoodName([]);
        }
    }, [keyword]);

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (keyword == '') {
            return;
        }

        try {
            
            /*if(response.data.status === "error"){
                alert(response.data.error);
            }
            else{
                alert(response.data.success);
                navigate(`/results/${keyword}`);
            }*/

            navigate(`/user/search/results/${keyword}`);
            
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed. Please try again.');
        }

        setKeyword('');
    };
    console.log(goodName);
    return (
        <>
            <form className="search-box" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="ค้นหาสินค้าได้ที่นี่"
                    name="keyword" 
                    value={keyword}
                    onChange={handleChange}
                    className="search-input"
                    required
                    autoComplete='off'
                />
                <button className='search-btn' type='submit'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
            {goodName.length > 0 &&
                <div className="search-box-results">
                    {goodName.map((good, goodindex) => (
                        <span 
                            key={goodindex} 
                            style={{'alignSelf': 'flex-start', borderBottom: '1px solid green', width: '100%'}}
                            onClick={() => {setKeyword(good.goodName);}}
                        >
                            {good.goodName}
                        </span>
                    ))}
                </div>
            }
        </>
    );
}

export default SearchBox;