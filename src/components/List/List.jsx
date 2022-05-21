import classNames from 'classnames';

import Badge from '../Badge/Badge';

import closeList from '../../assets/img/remove.svg'
import './List.scss'
import Loader from '../Loader/Loader';

const List = ({ lists, onClick, activeItemId, isRemovable, removeList, isNumerable, loadingDeleteElem }) => {

    // console.log(lists)

    const deleteList = (id) => {
        const isDelete = window.confirm('Вы действительно хотите удалить список?')

        if (isDelete) {
            removeList(id)
        }
    }

    return (
        <>
            { loadingDeleteElem && <Loader /> }
        <ul className='list'>
            {
               lists.map((list, i) => {

                   return (
                       <li key={i}>
                           <a 
                                className={classNames(list.classElem, 
                                    { active: list.active ? list.active : activeItemId && activeItemId === list.id }
                                )}
                                href="#"
                                onClick={onClick ? (e) => onClick(list.id, e) : null}
                            >
                            {list.icon ? list.icon : <Badge color={list.colorInfo.name} />}
                            <span className="list__naming">
                                {list.name} { list.tasks ? `(${list.tasks.length})` : isNumerable ? '(0)' : null }
                            </span>
                            { isRemovable && (
                                
                                <img 
                                    className='list-close' 
                                    src={closeList} 
                                    alt="Иконка закрытия" 
                                    onClick={removeList ? (e) => {
                                        deleteList(list.id)
                                        // e.stopPropagation()
                                    } : null}
                                />

                            ) }
                           </a>
                       </li>
                   )
               }) 
            }
        </ul>
        </>
    );
}

export default List;
