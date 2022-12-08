import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const setting = {
    withCredentials:true,
    headers: {
        'API-KEY': 'ea3d9034-c1d2-4ea3d9034-c1d2-4af3-a252-178ff469f42f'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
          .then((res) =>
              setState(res.data)
          )


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const title = "TEST"
        todolistAPI.createTodolist(title)
            .then((res) =>
                setState(res.data)
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todolitsId = 'de5b9a2d-986f-4504-a220-90dba8e05d97'
        todolistAPI.deleteTodolist(todolitsId)
            .then((res) =>
                setState(res.data)
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolitsId = 'b41e3c74-6d56-499b-8b4b-81d21f472dbb'
        const title = "NEW TEST"
        todolistAPI.updateTodolist(todolitsId, title)
            .then((res) =>
                setState(res.data)
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

