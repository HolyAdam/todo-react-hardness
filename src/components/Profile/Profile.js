import React from 'react';

import './Profile.scss'
import calendarIcon from '../../assets/img/calendar.svg'
import Time from './Time';

const Profile = () => {

    const [time, setTime] = React.useState({
        days: {
            daysType: 'дней',
            days: '00'
        },
        hours: {
            hoursType: 'часов',
            hours: '00'
        },
        minutes: {
            minutesType: 'минут',
            minutes: '00'
        },
        seconds: {
            secondsType: 'секунд',
            seconds: '00'
        }
    })

    React.useEffect(() => {
        const deadline = new Date(2022, 11, 30);
        // // id таймера
        let timerId = null;
        // склонение числительных
        function declensionNum(num, words) {
            return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
        }
        // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
        function countdownTimer() {
            const diff = deadline - new Date();
            if (diff <= 0) {
                clearInterval(timerId);
            }
            const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
            const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
            const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
            const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

            const argDays = days < 10 ? '0' + days : days;
            const argHours = hours < 10 ? '0' + hours : hours;
            const argMinutes = minutes < 10 ? '0' + minutes : minutes;
            const argSeconds = seconds < 10 ? '0' + seconds : seconds;

            const typeDaysText = declensionNum(days, ['день', 'дня', 'дней']);
            const typeHoursText = declensionNum(hours, ['час', 'часа', 'часов']);
            const typeMinutesText = declensionNum(minutes, ['минута', 'минуты', 'минут']);
            const typeSecondsText = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
            
            setTime({
                days: {
                    daysType: typeDaysText,
                    days: argDays
                },
                hours: {
                    hours: argHours,
                    hoursType: typeHoursText,
                },
                minutes: {
                    minutes: argMinutes,
                    minutesType: typeMinutesText
                },
                seconds: {
                    seconds: argSeconds,
                    secondsType: typeSecondsText
                }
            })
        
        }

        // вызываем функцию countdownTimer
        countdownTimer();
        // // вызываем функцию countdownTimer каждую секунду
        timerId = setInterval(countdownTimer, 1000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

        return (
            <div className='profile'>
                <div className="profile-top">
                    <h2 className="profile-title">
                        Привет, <span>Адам</span>!
                    </h2>
                    <p className="profile-subtitle">
                        Здесь будет хранится важная информация
                    </p>
                </div>
                <div className="profile-actions">
                    <h4 className="profile-actions__title">
                        Последние действия
                    </h4>
                    <ul className="profile-list">
                        <li className="profile-action">
                            <span className="profile-action__right">
                                <div className="profile-smile">

                                </div>
                                Тип действия: изменение настроения
                            </span>
                            <span className="profile-action__left">
                                <span className="profile-action__date">
                                    <img src={calendarIcon} alt="Календарь" />
                                    19.05.2022
                                </span>
                                <div className="profile-action__time">
                                    18:24
                                </div>
                            </span>
                        </li> 
                        <li className="profile-action">
                            <span className="profile-action__right">
                                <div className="profile-smile">

                                </div>
                                Тип действия: изменение настроения
                            </span>
                            <span className="profile-action__left">
                                <span className="profile-action__date">
                                    <img src={calendarIcon} alt="Календарь" />
                                    19.05.2022
                                </span>
                                <div className="profile-action__time">
                                    18:24
                                </div>
                            </span>
                        </li> 
                    </ul>
                </div>
                <h4 className="deadlined">
                    Время до конца
                </h4>
                <Time time={time} />
            </div>
    );
}

export default Profile;
