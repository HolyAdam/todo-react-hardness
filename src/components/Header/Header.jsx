import './Header.scss'
import imgLogo from '../../assets/img/logo.svg'
import sadSmile from '../../assets/img/sad_smile.jpg'
import Checkbox from './Checkbox/Checkbox'
import Naming from './Naming/Naming'


const Header = () => {

    return (
        <header className="header">
            <a href="/" className='header__logo'>
                <img src={imgLogo} alt="Логотип" />
            </a>
            <div className="header__profile">
                <div className="theme">
                    <span>
                        Тема
                    </span>
                    <Checkbox />
                </div>
                <div className="feeling">
                    <span>
                        Текущее настроение:
                    </span>
                    <img src={sadSmile} alt="Иконка настроения" />
                </div>
                <Naming />
            </div>
        </header>
    );
}

export default Header;
