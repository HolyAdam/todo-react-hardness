import classNames from 'classnames'
import { useState, useEffect } from 'react'

import { AppContext } from '../AppContext'


const Layout = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('isThemeDark') === 'true' ? true : false)

    return (
        <AppContext.Provider value={{
            setTheme,
            theme
        }}>
            <div className={classNames("container-fluid", { theme })}>
                { children }
            </div>
        </AppContext.Provider>
    )
}

export default Layout