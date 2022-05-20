import React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import List from './components/List/List';
import AddList from './components/AddList/AddList';
import ListInfo from './components/ListInfo/ListInfo';
import Profile from './components/Profile/Profile';
import Loader from './components/Loader/Loader';

const App = () => {

  const [lists, setLists] = React.useState(
    null
  )

  const [colors, setColors] = React.useState(
    null
  )

  const [activeList, setActiveList] = React.useState(null)

  const [isTasksLoading, setIsTasksLoading] = React.useState(false)
  const [isListsLoading, setIsListsLoading] = React.useState(false)
  const [isDeletingList, setTsDeletingList] = React.useState(false)
  


  React.useEffect(() => {

    setIsTasksLoading(true)

    const asyncFunc = async () => {
      let lists = await 
        axios.get('https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists.json')
      const colors = await 
        axios.get('https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/colors.json')

      const newArr = []

      lists = lists.data ? lists.data : {}
      

      Object.keys(lists).forEach(key => {
        lists[key].id = key
        lists[key].tasks = lists[key].tasks || new Array()
        newArr.push(lists[key])
      })

      newArr.map(list => {
        const objColor = colors.data.find(color => color.id === list.colorId)
        list.colorInfo = objColor
        return list
      })

      setLists(newArr)
      setIsTasksLoading(false)

      setColors(colors.data)

    }

    asyncFunc()
    
    
  }, [])

  const onListClickHandler = (id, e) => {

    if (!e.target.classList.contains('list-close')) {
      setActiveList(id)
    }
  }


  const onTaskChange = async (id, listId, listCurr) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        list.tasks.map(task => {
          if (task.id === id) {
            task.completed = !task.completed
          }
          return task
        })
      }
      return list
    }))

    try {
      await axios.put(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}.json`, {
        ...listCurr
      })
    } catch(e) {
      alert('Ошибка обновления таска ')
    }

  } 


  const onAddList = async (obj) => {

    try {
      setIsListsLoading(true)
      const { data } = await axios.post(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists.json`, {
      ...obj
    })
      obj.id = data.name
      setLists(state => [...state, obj])
      setActiveList(obj.id)
    } catch(e) {
      alert('Добавление списка - ошибка')
    }

    setIsListsLoading(false)

  }

  const titleChange = (title, listId) => {
    const newList = lists.map(list => {
      if (list.id == listId) {
        list.name = title
      }

      return list
    })

    setLists(lists => [...newList])

  }

  

  const deleteList = async (id) => {

    
    try {
      setTsDeletingList(true)

      await axios.delete(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists/${id}.json`)
    } catch(e) {
      alert('Удаление с ошибкой')
    }

    const newList = lists.filter((list, i) => {
      return list.id !== id
    })
    

    
    
    if (activeList === id) {
      setActiveList(null)
    }

    setLists(state => [...newList])

    setTsDeletingList(false)


  }

  const taskTitleChange = async (title, taskId, listId, listCurr) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        list.tasks.map(task => {
          if (task.id === taskId) {
            task.text = title
          }
          return task
        })
      }
      return list
    })



    setLists(state => [...newLists])

    try {
      await axios.put(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}.json`, {
        ...listCurr
      })
    } catch(e) {
      alert('Ошибка изменения таска ')
    }

  }

  const deleteTask = async (id, listId, listCurr) => {

    
    
    const newLists = lists.map(list => {
      if (list.id === listId) {
        const newTasks = list.tasks.filter(task => task.id !== id)
        list.tasks = newTasks
      }

      return list
    })

    setLists(state => [...newLists])

    try {
      await axios.put(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}.json`, {
        ...listCurr
      })
    } catch(e) {
      alert('Ошибка изменения таска ')
    }
  }

  const onAddTask = async (listId, obj) => {

    let currList = {}

    const newLists = lists.map(list => {
      if (list.id === listId) {

        list.tasks.push(obj)

        currList = list
        
      }
      return list
    })

    setLists(newLists)

    // обрабатывать запрос не хочу... в этом проекте лень)0)
    await axios.put(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists/${listId}.json`, {
      ...currList
    })

  }

  // console.log(lists)

  return (
    <Layout>
      <Header />
      <div className="wrapper">
        <div className="wrapper-list">
          <List lists={[
            {
              name: 'Все задачи',
              active: true,
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9599 8.1001H7.73995C7.24315 8.1001 7.19995 8.5024 7.19995 9.0001C7.19995 9.4978 7.24315 9.9001 7.73995 9.9001H12.9599C13.4567 9.9001 13.4999 9.4978 13.4999 9.0001C13.4999 8.5024 13.4567 8.1001 12.9599 8.1001ZM14.7599 12.6001H7.73995C7.24315 12.6001 7.19995 13.0024 7.19995 13.5001C7.19995 13.9978 7.24315 14.4001 7.73995 14.4001H14.7599C15.2567 14.4001 15.2999 13.9978 15.2999 13.5001C15.2999 13.0024 15.2567 12.6001 14.7599 12.6001ZM7.73995 5.4001H14.7599C15.2567 5.4001 15.2999 4.9978 15.2999 4.5001C15.2999 4.0024 15.2567 3.6001 14.7599 3.6001H7.73995C7.24315 3.6001 7.19995 4.0024 7.19995 4.5001C7.19995 4.9978 7.24315 5.4001 7.73995 5.4001ZM4.85995 8.1001H3.23995C2.74315 8.1001 2.69995 8.5024 2.69995 9.0001C2.69995 9.4978 2.74315 9.9001 3.23995 9.9001H4.85995C5.35675 9.9001 5.39995 9.4978 5.39995 9.0001C5.39995 8.5024 5.35675 8.1001 4.85995 8.1001ZM4.85995 12.6001H3.23995C2.74315 12.6001 2.69995 13.0024 2.69995 13.5001C2.69995 13.9978 2.74315 14.4001 3.23995 14.4001H4.85995C5.35675 14.4001 5.39995 13.9978 5.39995 13.5001C5.39995 13.0024 5.35675 12.6001 4.85995 12.6001ZM4.85995 3.6001H3.23995C2.74315 3.6001 2.69995 4.0024 2.69995 4.5001C2.69995 4.9978 2.74315 5.4001 3.23995 5.4001H4.85995C5.35675 5.4001 5.39995 4.9978 5.39995 4.5001C5.39995 4.0024 5.35675 3.6001 4.85995 3.6001Z" fill="#44FFD1"/>
                </svg>
              )
            },
          ]} 
            onClick={() => setActiveList(null)}
          />
          {Array.isArray(lists) ? (
            <List 
              lists={lists} 
              onClick={onListClickHandler}
              removeList={deleteList} 
              activeItemId={activeList}
              loadingDeleteElem={isDeletingList}
              isNumerable
              isRemovable
            />
          )
          : <p className='loading'>Загрузка...</p>
          }

          <AddList isLoading={isListsLoading} colors={colors} onAdd={onAddList} />
        </div>
        <div className="list-info">
        <Routes>
          <Route path={'/'} element={<p>12</p>} />
        </Routes>
        { Array.isArray(lists) && activeList ? (
            <ListInfo 
              taskChange={onTaskChange} 
              lists={lists} 
              listId={activeList}
              onTitleChange={titleChange}
              onTaskTitleChange={taskTitleChange}
              onDeleteHanlder={deleteTask}
              addTask={onAddTask}
              isTaskNameChanging
              /> )
          : 
              Array.isArray(lists) && lists.length ? (
                <>
              {
                lists.map(list => (
                  <ListInfo 
                    key={list.id} 
                    lists={lists} 
                    listId={list.id} 
                    taskChange={onTaskChange} 
                    onTitleChange={titleChange} 
                    onTaskTitleChange={taskTitleChange}
                    onDeleteHanlder={deleteTask}
                    addTask={onAddTask}
                  />
                ))
              }
            </>
              )
              : 
                isTasksLoading 
                  ? <Loader /> 
                  : (
                    <p className='empty'>Листов нет</p>
                  )
              
            }
            
        </div>
        <Profile />
      </div>

    </Layout>
  );
}

export default App;
