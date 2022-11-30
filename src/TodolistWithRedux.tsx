import React, {ChangeEvent, FC, memo, useCallback, useState} from 'react';
import {TodolistType} from "./AppWithRedux";
import EditableSpan from "./Components/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import AddItemForm from "./AddItemForm/AddItemForm";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./Todolist";
import styles from "./Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./store/todolists-reducer";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";

export type TodolistWithReduxPropsType = {
    todolist: TodolistType
}

const TodolistWithRedux: FC<TodolistWithReduxPropsType> = memo(({todolist}) => {
    console.log('Todolist')
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    //const [nameButton, setNameButton] = useState<FilterValuesType>('all')
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch])

    const removeTodolist = useCallback(() => dispatch(RemoveTodolistAC(id)), [dispatch])
    const changeTodolistTitle = useCallback((title: string) => dispatch(ChangeTodolistTitleAC(title, id)), [dispatch])
    const changeFilterAll = useCallback(() => {
        dispatch(ChangeTodolistFilterAC("all", id))
    }, [dispatch])
    const changeFilterActive = useCallback(() => {
        dispatch(ChangeTodolistFilterAC("active", id))
    }, [dispatch])
    const changeFilterCompleted = useCallback(() => {
        dispatch(ChangeTodolistFilterAC("completed", id))
    }, [dispatch])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    // const removeTask = () => {
    //     dispatch(removeTaskAC(tasks, id))
    // }
    // const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(changeTaskStatusAC(tasks, event.currentTarget.checked, id))
    // }
    // const changeTaskTitle = (title: string) => {
    //     dispatch(changeTaskTitleAC(tasks, title, id))
    // }

    const mapTasks = (t: TaskType) => {

        return <TaskWithRedux
            key={t.id}
            task={t}
            todolistId={id}/>
        // return (<li key={t.id} className={t.isDone ? styles.isDone : ""}>
        //     <Checkbox
        //         onChange={IsDoneHandler}
        //         checked={t.isDone}/>
        //     <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
        //     <IconButton aria-label="delete" color="primary" onClick={removeTaskHandler}>
        //         <Delete/>
        //     </IconButton>
        // </li>)
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
            <ButtonWithMemo variant={filter === 'all' ? "contained" : "text"} onClick={changeFilterAll} title={'All'}/>
            {/*<Button variant={filter === 'all' ? "contained" : "text"} onClick={changeFilterAll}>*/}
            {/*    All*/}
            {/*</Button>*/}

            <ButtonWithMemo variant={filter === 'active' ? "contained" : "text"} onClick={changeFilterActive}
                            color={"secondary"} title={'Active'}/>
            {/*<Button variant={filter === 'active' ? "contained" : "text"} color={"secondary"}*/}
            {/*        onClick={changeFilterActive}>*/}
            {/*    Active*/}
            {/*</Button>*/}

            <ButtonWithMemo variant={filter === 'completed' ? "contained" : "text"} onClick={changeFilterCompleted}
                            color={"primary"} title={'Completed'}/>
            {/*<Button variant={filter === 'completed' ? "contained" : "text"} color={"primary"}*/}
            {/*        onClick={changeFilterCompleted}>*/}
            {/*    Completed*/}
            {/*</Button>*/}
        </div>
    </div>

})


export default TodolistWithRedux;

type ButtonWithMemo = {
    variant: 'text' | 'outlined' | 'contained';
    onClick: () => void
    title: string
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
}

const ButtonWithMemo = memo((props: ButtonWithMemo) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}
    >
        {props.title}
    </Button>
})