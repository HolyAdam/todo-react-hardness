import './Header.scss'
import imgLogo from '../../assets/img/logo.svg'
import sadSmile from '../../assets/img/sad_smile.jpg'
import triangle from '../../assets/img/triangle.svg'


const Header = () => {
    return (
        <header className="header">
            <a href="/" className='header__logo'>
                <img src={imgLogo} alt="Логотип" />
            </a>
            <div className="header__profile">
                <div className="theme">
                    <input id='theme' type="checkbox" />
                    <label htmlFor="theme" style={{
                        userSelect: 'none',
                        marginLeft: 7
                    }}>Переключить тему</label>
                </div>
                <div className="feeling">
                    <span>
                        Текущее настроение:
                    </span>
                    <img src={sadSmile} alt="Иконка настроения" />
                </div>
                <button className="settings">
                    Adam
                    <img src={triangle} alt="Треугольник" />
                </button>

            </div>
        </header>
    );
}

export default Header;
