import React, {ChangeEvent, FC, useState} from 'react';
import {TasksStateType, TodolistType} from "./AppWithRedux";
import EditableSpan from "./Components/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import AddItemForm from "./AddItemForm";
import Button from "@material-ui/core/Button";
import {FilterValuesType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./Todolist";
import styles from "./Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./store/todolists-reducer";

export type TodolistWithReduxPropsType = {
    todolist: TodolistType
}

const TodolistWithRedux: FC<TodolistWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    //const [nameButton, setNameButton] = useState<FilterValuesType>('all')
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }
    const removeTodolist = () => dispatch(RemoveTodolistAC(id))
    const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(title, id))
    const changeFilterAll = () => {
        dispatch(ChangeTodolistFilterAC("all", id))
    }
    const changeFilterActive = () => {
        dispatch(ChangeTodolistFilterAC("active", id))
    }
    const changeFilterCompleted = () => {
        dispatch(ChangeTodolistFilterAC("completed", id))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }




    const mapTasks = (t: TaskType) => {
        const removeTaskHandler = () => {
            dispatch(removeTaskAC(t.id, id))
        }
        const IsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, event.currentTarget.checked, id))
        }
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(t.id, title, id))
        }
        return (<li key={t.id} className={t.isDone ? styles.isDone : ""}>
            <Checkbox
                onChange={IsDoneHandler}
                checked={t.isDone}/>
            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
            <IconButton aria-label="delete" color="primary" onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>)
    }
    const tasksList = tasks.length
        ? <ul>{tasks.map(mapTasks)}</ul>
        : <span>Your taskslist is empty :(</span>




    return <div>
        <h3>
            <EditableSpan title={title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete" color="primary">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        {tasksList}
        <div>
            <Button variant={filter === 'all' ? "contained" : "text"} onClick={changeFilterAll}>
                All
            </Button>
            <Button variant={filter === 'active' ? "contained" : "text"} color={"secondary"}
                    onClick={changeFilterActive}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? "contained" : "text"} color={"primary"}
                    onClick={changeFilterCompleted}>
                Completed
            </Button>

        </div>
    </div>

}


export default TodolistWithRedux;