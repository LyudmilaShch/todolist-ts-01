import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}
type updateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
type deleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'ea3d9034-c1d2-4ea3d9034-c1d2-4af3-a252-178ff469f42f',
    },
})

export const todolistAPI = {
    getTodolist() {
       return instance.get<Array<TodolistType>>('todo-lists')},

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title:title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            { title: title }
        )
        return promise
    },
}
