import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddItemForm from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  addItem: action('Button clicked')
};


const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')
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
            args.addItem(title.trim())
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
};


export const AddItemFormStoryWithError = TemplateWithError.bind({});

AddItemFormStoryWithError.args = {
    addItem: action('Button clicked')
}
