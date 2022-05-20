import React from 'react';

const AddTaskForm = ({ listId, addTaskFormHandler }) => {

    const [isFormVisible, setIsFormVisible] = React.useState(false)
    const [taskValue, setTaskValue] = React.useState('')


    return (
        <div className="task-add">

            {
                !isFormVisible 
                ? (
                    <button className="task-add__title" onClick={() => setIsFormVisible(true)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        Добавить таску
                    </button>
                )
                : (
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (taskValue.trim()) {
                            addTaskFormHandler(e, listId, taskValue)

                            setIsFormVisible(false)
                            setTaskValue('')
                        }
                    }}>
                        <input 
                            type="text" 
                            placeholder='Название таска' 
                            value={taskValue}
                            onChange={e => setTaskValue(e.target.value)}
                        />
                        <button>Добавить</button>
                    </form>
                )
            }

                
        </div>
    );
}

export default AddTaskForm;
