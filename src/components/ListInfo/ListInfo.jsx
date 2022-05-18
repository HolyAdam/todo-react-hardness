import editImg from '../../assets/img/edit.svg'
import removeImg from '../../assets/img/remove.svg'
import './ListInfo.scss';

const ListInfo = () => {
    return (
        <div className='listInfo'>
            <div className='listInfo__title-block'>
                <div className='title'>Фронтенд</div>
                <img src={editImg} alt='изменить блок' />
            </div>
            <div className='listInfo__text-block'>
                <ul>
                    <li>
                        <input type="checkbox" /> Изучить все хуки в реакте, а также Reducer 
                        <span>
                            <img src={editImg} alt='изменить блок' />
                            <img src={removeImg} alt='удалить' />
                        </span>
                    </li>
                    <li><input type="checkbox" /> Изучить JavaScript</li>
                    <li><input type="checkbox" /> Изучить JavaScript</li>
                </ul>
            </div>
        </div>
    );
};

export default ListInfo;