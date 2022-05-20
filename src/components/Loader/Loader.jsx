import React from 'react';

import './Loader.scss'

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 8
        }}>
            <div className="lds-dual-ring"></div>
        </div>
    );
}

export default Loader;
