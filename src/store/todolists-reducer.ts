import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todolistId: string
}

type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todolistId: string
}

const initialState: Array<TodolistType> = []

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [newTodolist, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
             return todolists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string):RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todolistId: id})
export const AddTodolistAC = (title: string):AddTodolistAT => ({ type: "ADD-TODOLIST", title: title, todolistId: v1()})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string):ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todolistId:  todolistId})
export const ChangeTodolistTitleAC = (title: string, todolistId: string):ChangeTodolistTitleAT => ({type:"CHANGE-TODOLIST-TITLE", title: title, todolistId:  todolistId})
