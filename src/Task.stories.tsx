import React, {ChangeEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './stories/Button';
import {Task} from "./Task";
import {TaskType} from "./Todolist";
import {action} from '@storybook/addon-actions';
import styles from "./Todolist.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import EditableSpan from "./Components/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: 'TodolistId',
        task: {id: 'asdff', title: 'title', isDone: true},
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});


export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: 'asdff', title: 'title', isDone: false},
}

const TemplateWork: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState(args.task)
    const removeTask = () => args.removeTask("tsksId")
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        setTask({...task, isDone: newIsDoneValue})
    }
    const onTitleChangeHandler = (newValue: string) => {
        setTask({...task, title: newValue})
    }
    return (<li key={task.id} className={task.isDone ? styles.isDone : ""}>
        <Checkbox
            onChange={onChangeHandler}
            checked={task.isDone}/>
        <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
        <IconButton aria-label="delete" color="primary" onClick={removeTask}>
            <Delete/>
        </IconButton>
    </li>)
}

export const TaskWorkStory = TemplateWork.bind({
    removeTask: action('removeTask'),
});