import React, {ChangeEvent, memo} from 'react';
import EditableSpan from "./Components/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import styles from "./Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {stringify} from "uuid/index";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

   const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, event.currentTarget.checked, todolistId))
    }
    const onTitleChangeHandler = (newValue:string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }

    return  (<li key={task.id} className={task.isDone ? styles.isDone : ""}>
        <Checkbox
            onChange={onChangeHandler}
            checked={task.isDone}/>
        <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
        <IconButton aria-label="delete" color="primary" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>)
})