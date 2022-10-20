import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        isEditMode
        ? <input value={title} autoFocus onBlur={offEditMode} onChange={onChangeTitle}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;