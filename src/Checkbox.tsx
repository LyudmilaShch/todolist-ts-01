import React, {ChangeEvent} from 'react';

type PropsType = {
    checked: boolean;
    callBack: (isDone: boolean) => void
}

export const Checkbox = (props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (

        <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
       /* <input type="checkbox" checked={t.isDone} onChange={event => onChangeHandler(t.id, event.currentTarget.checked)}/>*/

    )
}