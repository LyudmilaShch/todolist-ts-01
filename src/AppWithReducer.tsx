import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}


function AppWithReducer() {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Toilet paper", isDone: false},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })

    const changeIsDone = (newId: string, newIsDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(newId, newIsDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }

    function removeTask(id: string, todoListId: string) {
        let action = removeTaskAC(id, todoListId)
        dispatchToTasks(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
      dispatchToTodolist(ChangeTodolistFilterAC(value, todoListId))
    }

    const changeTodolistTitle = (title: string, todoListId: string) => {
        dispatchToTodolist(ChangeTodolistTitleAC(title, todoListId))
    }
    const removeTodolist = (todoListId: string) => {
        let action = RemoveTodolistAC(todoListId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForTodolist = tasks;

        if (filter === "active") {
            tasksForTodolist = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone);

        }
        return tasksForTodolist
    }
    const todoListComponents = todoLists.map(tl => {
        return <Grid item>
            <Paper elevation={3} style={{padding: '10px'}}>
                <Todolist
                    key={tl.id}
                    title={tl.title}
                    todoListId={tl.id}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeIsDone={changeIsDone}
                    changeTaskTitle={changeTaskTitle}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                />
            </Paper>
        </Grid>
    })


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "40px 0 40px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer
