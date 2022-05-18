import classNames from 'classnames';

import Badge from '../Badge/Badge';

import closeList from '../../assets/img/remove.svg'
import './List.scss'

const List = ({ lists, onClick, activeItemId, isRemovable, removeList }) => {

    const deleteList = (id) => {
        const isDelete = window.confirm('Вы действительно хотите удалить список?')

        if (isDelete) {
            removeList(id)
        }
    }

    return (
        <ul className='list'>
            {
               lists.map(list => {

                   return (
                       <li>
                           <a 
                                className={classNames(list.classElem, 
                                    { active: list.active ? list.active : activeItemId && activeItemId === list.id }
                                )}
                                href="#"
                                onClick={onClick ? () => onClick(list.id) : null}
                            >
                            {list.icon ? list.icon : <Badge color={list.colorInfo.name} />}
                            <span>
                                {list.name}
                            </span>
                            { isRemovable && (
                                
                                <img 
                                    className='list-close' 
                                    src={closeList} 
                                    alt="Иконка закрытия" 
                                    onClick={removeList ? () => deleteList(list.id) : null}
                                />

                            ) }
                           </a>
                       </li>
                   )
               }) 
            }
        </ul>
    );
}

export default List;
