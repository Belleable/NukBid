import React from "react";
import Countdown from 'react-countdown';

function Timer({endTime}) {
    const end = new Date(endTime)
    const Completionist = () => <span style={{color: 'red'}} >หมดเวลา</span>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
        return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    };

    return (
        <>
            <Countdown id="timer" date={Date.now() + (end - Date.now())}  renderer={renderer}/>
        </>
    )
}

export default Timer;