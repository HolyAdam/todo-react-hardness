import React from 'react'

import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";

import DB from './assets/db.json'
import List from './components/List/List';
import AddList from './components/AddList/AddList';
import ListInfo from './components/ListInfo/ListInfo';

const App = () => {

  const [lists, setLists] = React.useState(
    DB.lists.map(list => {
      const color = DB.colors.find(color => color.id === list.colorId)
      list.colorInfo = color
      return list
    })
  )

  const [activeList, setActiveList] = React.useState(null)

  const onListClickHandler = (id) => {
    setActiveList(id)
  }


  const onAddList = (obj) => {
    const color = DB.colors.find(color => color.id === obj.colorId)
    obj.colorInfo = color  
    setLists(state => [...state, obj])
  }

  const deleteList = (id) => {
    const newList = lists.filter(list => list.id !== id)
    setLists(newList)
  }

  return (
    <Layout>
      <Header />
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
      ]} />
      <List lists={lists} 
        onClick={onListClickHandler}
        removeList={deleteList} 
        activeItemId={activeList} 
        isRemovable
      />

      <AddList colors={DB.colors} onAdd={onAddList} />
      <ListInfo />

    </Layout>
  );
}

export default App;
