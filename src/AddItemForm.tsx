import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }
    const onEnterDownAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle(' ')
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input className={error ? styles.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onEnterDownAddItem}/>
            <button onClick={addItem}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}

        </div>
    );
};

export default AddItemForm;