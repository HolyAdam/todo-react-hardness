import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import AddTaskForm from './AddTaskForm';
import './ListInfo.scss';

const ListInfo = (
    { 
        listId, lists, taskChange, onTitleChange, 
        onTaskTitleChange, onDeleteHanlder, addTask,
        
    }) => {

    const [isTaskNameChanging, setIsTaskNameChanging] = React.useState(false)

    const currentList = lists.find(list => list.id === listId)

    if (!currentList) {
        return null
    }

    const HEX = currentList.colorInfo.hex


    const titleChanging = async () => {
        const title = window.prompt('Введите новый заголовок', currentList.name)
        
        if (title.trim()) {

            setIsTaskNameChanging(true)
            
            onTitleChange(title, listId)

            try {
                await axios.put(`https://todo-hard-22-default-rtdb.europe-west1.firebasedatabase.app/lists/${currentList.id}.json`, {
                    ...currentList,
                    name: title
                })
    
            } catch(e) {
                alert('Ошибка изменения заголовка')
            }

            setIsTaskNameChanging(false)

        }
        


    }

    const addTaskFormHandler = async (e, listId, taskTitle) => {
        const obj = {
            text: taskTitle,
            id: Date.now(),
            taskId: listId,
            completed: false
        }
        
        await addTask(listId, obj)
        

    }

    const taskTitleChange = ({ id, text }) => {
        const title = window.prompt('Введите новый заголовок', text)
        
        if (title.trim()) {
            onTaskTitleChange(title, id, listId, currentList)
        }

    }

    const taskDelete = ({ taskId, listId }) => {
        const isDelete = window.confirm('Хотите удалить таску?')
        
        if (isDelete) {
            onDeleteHanlder(taskId, listId, currentList)
        }
    }

    return (
        <>
            { isTaskNameChanging && <Loader /> }
        <div className='listInfo'>
            <div className='listInfo__title-block' style={{
                borderBottom: `2px solid ${HEX}`
            }}>
                <div className='title' style={{
                    color: HEX
                }}>{currentList.name}
                <svg onClick={titleChanging} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.64032V11.6667C0 11.8534 0.146646 12 0.333288 12H2.35968C2.44634 12 2.53299 11.9666 2.59298 11.9L9.872 4.62766L7.37234 2.12801L0.0999864 9.40032C0.0333289 9.46704 0 9.54696 0 9.64032ZM11.805 2.6946C11.8669 2.63293 11.9159 2.55968 11.9494 2.47904C11.9828 2.39841 12 2.31196 12 2.22466C12 2.13736 11.9828 2.05092 11.9494 1.97028C11.9159 1.88964 11.8669 1.81639 11.805 1.75473L10.2453 0.194936C10.1836 0.133142 10.1104 0.0841168 10.0298 0.0506674C9.94912 0.0172176 9.86264 0 9.77536 0C9.68808 0 9.6016 0.0172176 9.52096 0.0506674C9.44032 0.0841168 9.36704 0.133142 9.30544 0.194936L8.0856 1.41477L10.5852 3.91443L11.805 2.6946Z"/>
                </svg>

                </div>
            </div>
            <div className='listInfo__text-block'>
                <ul>
                    {   
                        currentList.tasks && currentList.tasks.length ? currentList.tasks.map((task) => (
                            <li key={task.id}>
                                <span className="checkbox">
                                    <input type="checkbox" id={'input' + task.id + listId} checked={task.completed} onChange={() => taskChange(task.id, listId, currentList)} />
                                    <label htmlFor={'input' + task.id + listId}>
                                    <svg className='done' width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.30005 1.19995L3.80005 6.69995L1.30005 4.19995" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    

                                        {task.text}
                                    </label>
                                </span>
                                <span className='info-icons'>
                                    <svg onClick={() => taskTitleChange({id: task.id, text: task.text})} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9.64032V11.6667C0 11.8534 0.146646 12 0.333288 12H2.35968C2.44634 12 2.53299 11.9666 2.59298 11.9L9.872 4.62766L7.37234 2.12801L0.0999864 9.40032C0.0333289 9.46704 0 9.54696 0 9.64032ZM11.805 2.6946C11.8669 2.63293 11.9159 2.55968 11.9494 2.47904C11.9828 2.39841 12 2.31196 12 2.22466C12 2.13736 11.9828 2.05092 11.9494 1.97028C11.9159 1.88964 11.8669 1.81639 11.805 1.75473L10.2453 0.194936C10.1836 0.133142 10.1104 0.0841168 10.0298 0.0506674C9.94912 0.0172176 9.86264 0 9.77536 0C9.68808 0 9.6016 0.0172176 9.52096 0.0506674C9.44032 0.0841168 9.36704 0.133142 9.30544 0.194936L8.0856 1.41477L10.5852 3.91443L11.805 2.6946Z"/>
                                    </svg>
                                    
                                    <svg onClick={() => taskDelete({ taskId: task.id, listId })} width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.62267 4.5L8.7651 1.35758C8.91425 1.20871 8.99812 1.00668 8.99828 0.795953C8.99853 0.585226 8.91499 0.383055 8.76608 0.233917C8.61717 0.0847775 8.41516 0.000887932 8.20448 0.00070183C7.99373 0.000515729 7.79156 0.0840485 7.64242 0.232924L4.5 3.37534L1.35758 0.232924C1.20844 0.0837851 1.00617 0 0.795251 0C0.584338 0 0.382062 0.0837851 0.232924 0.232924C0.0837851 0.382062 0 0.584338 0 0.795251C0 1.00617 0.0837851 1.20844 0.232924 1.35758L3.37534 4.5L0.232924 7.64242C0.0837851 7.79156 0 7.99383 0 8.20473C0 8.41565 0.0837851 8.61791 0.232924 8.76706C0.382062 8.91622 0.584338 9 0.795251 9C1.00617 9 1.20844 8.91622 1.35758 8.76706L4.5 5.62466L7.64242 8.76706C7.79156 8.91622 7.99383 9 8.20473 9C8.41565 9 8.61791 8.91622 8.76706 8.76706C8.91622 8.61791 9 8.41565 9 8.20473C9 7.99383 8.91622 7.79156 8.76706 7.64242L5.62267 4.5Z" fill="#44FFD1"/>
                                    </svg>

                                </span>
                            </li>
                        ))
                        : <p className='empty-task'>Нет тасков</p>
                    }
                    <AddTaskForm 
                        key={listId}
                        listId={listId} 
                        addTaskFormHandler={addTaskFormHandler}
                    />
                </ul>
            </div>
        </div>
        </>
    );
};

export default ListInfo;