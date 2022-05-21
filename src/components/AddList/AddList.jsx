import { useState, useEffect } from 'react'
import classNames from 'classnames';

import List from "../List/List";

import './AddList.scss'
import closeListImg from '../../assets/img/close_list.svg'
import Badge from "../Badge/Badge";

const AddList = ({ colors, onAdd, id, isLoading }) => {



  const [visiblePopupColor, setVisiblePopupColor] = useState(false)
  const [activeColor, setActiveColor] = useState(null)
  const [intValue, setIntValue] = useState('')
  
  useEffect(() => {
    if (Array.isArray(colors)) {
      setActiveColor(colors[0].id)
    }
  }, [colors])

  const clears = () => {
    setVisiblePopupColor(false)
    setIntValue('')
    setActiveColor(colors[0].id)
  }

  const addListHandler = async () => {
    if (!intValue.trim()) {
      alert('Поле не может быть пустым')
      return
    }

    const objColor = colors.find(color => color.id === activeColor)
    
    const obj = {
      name: intValue,
      colorId: activeColor,
      tasks: new Array(),
      colorInfo: objColor
    }

    await onAdd(obj)

    clears()

  }

  const onEnterHandler = (e) => {
    if (e.keyCode === 13) {
      addListHandler()
    }
  }

    return (
      <>
        {
          colors && (
            <div className="add-list">
        <List onClick={(_, e) => {
          e.preventDefault()
          setVisiblePopupColor(true)
        }} lists={[
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
                  colors.map((color, i) => {
                    return (
                      <li key={i} onClick={() => setActiveColor(color.id)}>
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
                { isLoading ? 'Добавление...' : 'Добавить' }
              </button>
            </div>
          )
        }

      </div>
          )
        }
      </>
    )
}

export default AddList;
