import { AppContext } from '../AppContext'

const Layout = ({ children }) => {

    const ss21 = () => {
        console.log('Потом заюзаю')
    }

    return (
        <AppContext.Provider value={{
            ss21
        }}>
            <div className="container-fluid">
                { children }
            </div>
        </AppContext.Provider>
    )
}

export default Layout