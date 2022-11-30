import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
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
            <TextField
                id="outlined-basic"
                label={ error ? "Title is required" : "type out here..."}
                variant="outlined"
                size="small"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onEnterDownAddItem}
                error={!!error}
            />
            <Button variant="contained" style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                    onClick={addItem}>+</Button>
            {/*{error && <div className={styles.errorMessage}>{error}</div>}*/}

        </div>
    );
});

export default AddItemForm;