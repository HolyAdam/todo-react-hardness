import './Naming.scss'

import React from 'react';

import triangle from '../../../assets/img/triangle.svg'

const Naming = () => {

    const [isVisibleList, setIsVisibleList] = React.useState(false)

    return (
        <div className="naming">
            <button className="settings" onClick={() => setIsVisibleList(!isVisibleList)}>
                Adam
                <img src={triangle} alt="Треугольник" />
            </button>
            { isVisibleList && (
                <ul className="naming-list">
                <li className="naming-item">
                    <a href="https://t.me/xzc221" className="naming-link" target='_blank'>
                        tg
                    </a>
                </li>
                <li className="naming-item">
                    <a href="https://instagram.com/adam_dasten" className="naming-link" target='_blank'>
                        inst
                    </a>
                </li>
                <li className="naming-item">
                    <a href="https://vk.com/fizikadlyadaynov" className="naming-link" target='_blank'>
                        vk
                    </a>
                </li>
            </ul>
            ) }
            
        </div>
    );
}

export default Naming;
