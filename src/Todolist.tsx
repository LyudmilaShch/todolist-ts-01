import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from "./Todolist.module.css";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./Components/EditableSpan";
// import {Button, IconButton} from "@material-ui/core";
// import {Delete} from "@material-ui/icons";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeIsDone: (id: string, newIsDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
}

function DeleteIcon() {
    return null;
}

export function Todolist(props: PropsType) {

    const [nameButton, setNameButton] = useState<FilterValuesType>('all')

    const mapTasks = (t: TaskType) => {
        const removeTaskHandler = () => {
            props.removeTask(t.id, props.todoListId)
        }
        const IsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(t.id, event.currentTarget.checked, props.todoListId)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListId)
        }
        return (
            <li key={t.id} className={t.isDone ? styles.isDone : ""}>
                {/*          <Checkbox checked={t.isDone} callBack={(isDone: boolean) => props.changeIsDone(t.id, event.currentTarget.checked, props.todoListId)}/>*/}


                <Checkbox
                    onChange={IsDoneHandler}
                    checked={t.isDone}/>
                {/*<input type="checkbox" checked={t.isDone} onChange={IsDoneHandler}/>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton aria-label="delete" color="primary" onClick={removeTaskHandler}>
                    <Delete />
                </IconButton>


            </li>)
    }
    const tasksList = props.tasks.length
        ? <ul>{props.tasks.map(mapTasks)}</ul>
        : <span>Your taskslist is empty :(</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const changeFilterAll = () => {
        props.changeFilter("all", props.todoListId)
        setNameButton("all")
    }
    const changeFilterActive = () => {
        props.changeFilter("active", props.todoListId)
        setNameButton("active")
    }
    const changeFilterCompleted = () => {
        props.changeFilter("completed", props.todoListId)
        setNameButton("completed")
    }
    /*
            const tsarChangeFilter = (FilterValue: FilterValuesType) => {
                props.changeFilter(FilterValue,  props.todoListId)
            }
        const removeTaskHandler = (tID: string) => {
            props.removeTask(tID, props.todoListId)
        }
        const changeIsDoneHandler = (tID: string, isDone: boolean) => {
            props.changeIsDone(tID, isDone, props.todoListId)
        }
    */


    const removeTodolist = () => props.removeTodolist(props.todoListId)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListId)

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete" color="primary" >
                <Delete />
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        {tasksList}
        <div>

            {/*            <Button name={"All"} callBack={() => tsarChangeFilter("all")}/>
            <Button name={"Active"} callBack={() => tsarChangeFilter("active")}/>
            <Button name={"Completed"} callBack={() => tsarChangeFilter("completed")}/>*/}

            {/*            <button onClick={() => tsarChangeFilter("all")}>All</button>
            <button onClick={() => tsarChangeFilter("active")}>Active</button>
            <button onClick={() => tsarChangeFilter("completed")}>Completed</button>*/}
            <Button  variant={nameButton === 'all' ? "contained" : "text"} onClick={changeFilterAll}>
                All
            </Button>
            <Button  variant={nameButton === 'active' ? "contained" : "text"} color={"secondary"}  onClick={changeFilterActive}>
                Active
            </Button>
            <Button  variant={nameButton === 'completed' ? "contained" : "text"}  color={"primary"} onClick={changeFilterCompleted}>
                Completed
            </Button>

        </div>
    </div>
}
