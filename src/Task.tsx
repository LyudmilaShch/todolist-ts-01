import React, {ChangeEvent} from 'react';
import EditableSpan from "./Components/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import styles from "./Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import {TaskType} from "./Todolist";


export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle:(id: string, title: string) => void
    removeTask: (taskId: string) => void
    todolistId?: string

}

export const Task = ({task, changeTaskStatus, changeTaskTitle, removeTask, todolistId=''}: TaskPropsType) => {


    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, event.currentTarget.checked)
    }
    const onTitleChangeHandler = (newValue:string) => {
        changeTaskTitle(task.id, newValue)
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
}