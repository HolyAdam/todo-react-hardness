import { useEffect, useContext } from 'react'
import { AppContext } from '../../../hoc/AppContext'
import './Checkbox.scss'


const Checkbox = () => {

    const { setTheme, theme } = useContext(AppContext)

    useEffect(() => {
        localStorage.setItem('isThemeDark', theme)
    }, [theme])

    const onThemeChange = (e) => {
        setTheme(theme => e.target.checked)
    }    

    return (
        <div className="checkbox-header">
            <label className="fancy-checkbox halo-bg">
                <input 
                    type="checkbox" 
                    checked={theme} 
                    onChange={onThemeChange} 
                />
                <i></i>
            </label>
        </div>
    );
}

export default Checkbox;
