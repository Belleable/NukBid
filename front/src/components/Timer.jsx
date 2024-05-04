import React from "react";
import Countdown from 'react-countdown';

function Timer({endTime}) {
    const end = new Date(endTime)
    const Completionist = () => <></>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
        return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    };

    return (
        <>
            <div><Countdown date={Date.now() + (end - Date.now())}  renderer={renderer}/></div>
        </>
    )
}

export default Timer;