import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterButtonType = 'All' | 'Active' | 'Completed'

function App() {
    const title1 = "What to learn"
    const title2 = "What to learn22222"
    /*    let tasks1 = [
            { id: 1, title: "HTML&CSS", isDone: true, newValue: true },
            { id: 2, title: "JS", isDone: true, newValue: true },
            { id: 3, title: "ReactJS", isDone: false, newValue: true }
        ]*/

    const [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true, newValue: true},
        {id: 2, title: "JS", isDone: true, newValue: true},
        {id: 3, title: "ReactJS", isDone: false, newValue: true}
    ])

    const removeTask = (taskID: number) => {
        setTasks1(tasks1.filter(el => el.id !== taskID))
        console.log(tasks1)
    }

    const [FilteredTasks, setFilteredTasks] = useState<TasksType[]>(tasks1)
    /*    let [durshlakValue, setDurshlakValue] = useState<FilterButtonType>('All')

        let Durshlak = tasks1

        if (durshlakValue === 'Active') {
             Durshlak = tasks1.filter(el => !el.isDone)}
        if (durshlakValue === 'Completed'){
            Durshlak = tasks1.filter(el => el.isDone)}*/


    const [filteredTask, setFilteredTask] = useState<TaskType[]>(tasks1)


    const changeFilter = (filterValue: FilterButtonType) => {
        // если filterValue==='Completed'{
        // то засетай tasks1.filter(el => !el.isDone)
        // }
    ...
        еще
        один
        иф
    }


    return (

        <div className="App">
            <Todolist
                title={title1}
                tasks={Durshlak}
                removeTask={filteredTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;

/*const[filteredTask,setFilteredTask]=useState<TaskType[]>(tasks1)


const changeFilter = (filterValue: FilterButtonType) => {
    // если filterValue==='Completed'{
    // то засетай tasks1.filter(el => !el.isDone)
    // }
...еще один иф
}

return (
    <div className="App">
        <Todolist
            title="What to learn"
            tasks={tasks1}
            removeTask={filteredTask}
            changeFilter={changeFilter}
        />
    </div>
);*/

