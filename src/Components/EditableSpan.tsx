import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = memo((props: EditableSpanPropsType) => {
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
        console.log(title)
    }
    return (
        isEditMode
        ? <input value={title} autoFocus onBlur={offEditMode} onChange={onChangeTitle}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
});

export default EditableSpan;