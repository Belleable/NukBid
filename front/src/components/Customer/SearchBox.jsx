import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function SearchBox() {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('');

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

            navigate(`/user/results/${keyword}`);
            
        } catch (error) {
            console.error('Search error:', error);
            alert('Search failed. Please try again.');
        }

        setKeyword('');
    };
    
    return (
        <>
            <form className="search-box" onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="ค้นหาสินค้าได้ที่นี่"
                name="keyword" 
                value={keyword}
                onChange={handleChange}
                className="search-input"
                required />
                <button className='search-btn' type='submit'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </>
    );
}

export default SearchBox;