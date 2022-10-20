import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}


function App() {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((el => el.id === newId ? {...el, isDone: newIsDone} : el))
        })
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((el => el.id === taskId ? {...el, title: title} : el))
        })
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }

    function removeTask(id: string, todoListId: string) {
        /*        const copyTasks = {...tasks}
                copyTasks[todoListId] = copyTasks[todoListId].filter(t => t.id !== id)
                setTasks(copyTasks);*/

        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== id)
        });
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl));
    }

    const changeTodolistTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl));
    }
    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
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
        return (
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
        )
    })
    const addTodoList = (title: string) => {
        const newTodolistId: string = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponents}
        </div>
    );
}

export default App;
