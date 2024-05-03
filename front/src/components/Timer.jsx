import React, { useState, useEffect } from "react";
import Countdown from 'react-countdown';

function Timer({endTime}) {
    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
        return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    };

    const handleStart = () => {

    }

    return (
        <>
            <div><Countdown date={Date.now() + 100000000}  renderer={renderer} /></div>
        </>
    )
}

export default Timer;