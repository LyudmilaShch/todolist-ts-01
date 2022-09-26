import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const addTasksHandler = () => {
        props.addTask(title)
        setTitle(' ')
        console.log(title)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTasksHandler()
        }
    }
    const changeFilterAll = () => {
        props.changeFilter("all")
    }
    const changeFilterActive = () => {
        props.changeFilter("active")
    }
    const changeFilterCompleted = () => {
        props.changeFilter("completed")
    }
    const tsarChangeFilter = (FilterValue: FilterValuesType) => {
        props.changeFilter(FilterValue)
    }
    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }
    const mapTasks = props.tasks.map(t => {
        /* const removeTaskHandler = () => {
           props.removeTask(t.id)
        }*/
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {removeTaskHandler(t.id)}}>x
                </button>
            </li>)
})

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTasksHandler}>+</button>
        </div>
        <ul>
            {mapTasks}
        </ul>
        <div>
            <Button name={"All"} callBack={() => tsarChangeFilter("all")}/>
            <Button name={"Active"} callBack={() => tsarChangeFilter("active")}/>
            <Button name={"Completed"} callBack={() => tsarChangeFilter("completed")}/>

            {/*<button onClick={() => tsarChangeFilter("all")}>All</button>
            <button onClick={() => tsarChangeFilter("active")}>Active</button>
            <button onClick={() => tsarChangeFilter("completed")}>Completed</button>*/}
            {/*<button onClick={changeFilterAll}> All </button>
            <button onClick={changeFilterActive}>Active</button>
            <button onClick={changeFilterCompleted}>Completed</button>*/}
        </div>
    </div>
}
