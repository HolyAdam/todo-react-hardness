import React from 'react';

const Time = ({ time }) => {
    return (
        <div className="profile-times">
            <div className="timer">
                <div className="timer__items">
                    <div className="timer__item timer__days">{time.days.days} <span className='mini'>{time.days.daysType}</span></div>
                    <div className="timer__item timer__hours">{time.hours.hours} <span className='mini'>{time.hours.hoursType}</span></div>
                    <div className="timer__item timer__minutes">{time.minutes.minutes} <span className='mini'>{time.minutes.minutesType}</span></div>
                    <div className="timer__item timer__seconds">{time.seconds.seconds} <span className='mini'>{time.seconds.secondsType}</span></div>
                </div>
            </div>
        </div>
    );
}

export default Time;
