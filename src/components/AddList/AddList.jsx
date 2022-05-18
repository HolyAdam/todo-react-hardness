import { useState } from 'react'
import classNames from 'classnames';

import List from "../List/List";

import './AddList.scss'
import closeListImg from '../../assets/img/close_list.svg'
import Badge from "../Badge/Badge";

const AddList = ({ colors, onAdd }) => {

  const [visiblePopupColor, setVisiblePopupColor] = useState(false)
  const [activeColor, setActiveColor] = useState(colors[0].id)
  const [intValue, setIntValue] = useState('')

  const clears = () => {
    setVisiblePopupColor(false)
    setIntValue('')
    setActiveColor(colors[0].id)
  }

  const addListHandler = () => {
    if (!intValue.trim()) {
      alert('Поле не может быть пустым')
      return
    }

    
    const obj = {
      name: intValue,
      colorId: activeColor,
      id: Date.now()
    }

    clears()

    onAdd(obj)

  }

  const onEnterHandler = (e) => {
    if (e.keyCode === 13) {
      addListHandler()
    }
  }

    return (
      <div className="add-list">
        <List onClick={() => setVisiblePopupColor(true)} lists={[
          {
            icon: (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            ),
            name: 'Новый список',
            classElem: 'add-list__btn'
          }
        ]} />
        
        
        {
          visiblePopupColor && (
            <div className="add-list__menu">
              <img onClick={() => clears()} src={closeListImg} alt="Иконка закрытия" />
              <input 
                type="text" 
                className="add-list__int" 
                placeholder="Название списка"
                value={intValue} 
                onChange={e => setIntValue(e.target.value)}
                onKeyUp={onEnterHandler} 
              />
              <ul className="colors">
                {
                  colors.map(color => {
                    return (
                      <li onClick={() => setActiveColor(color.id)}>
                        <Badge 
                          activeClassName={classNames({active: activeColor === color.id})} 
                          color={color.name} 
                        />
                      </li>
                    )
                  })
                }
              </ul>
              <button 
                className="add-list__goadd" 
                onClick={addListHandler}
              >
                Добавить
              </button>
            </div>
          )
        }

      </div>
    )
}

export default AddList;
