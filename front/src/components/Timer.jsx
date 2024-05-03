import React, { useState, useEffect } from "react";
import DateCountdown from 'react-date-countdown-timer';


function Timer({endTime}) {
    return <DateCountdown dateTo='May 03, 2024 20:52:00 GMT+07:00' callback={()=>alert('Hello')}  />;
}

export default Timer;